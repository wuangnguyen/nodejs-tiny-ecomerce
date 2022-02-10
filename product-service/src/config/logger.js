const winston = require('winston');
const { SeqTransport } = require('@datalust/winston-seq');
const config = require('./config');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    }),
    new SeqTransport({
      serverUrl: `http://${config.seq.host}:5341`,
      onError: (e) => {
        console.error(e);
      },
      handleExceptions: true,
      handleRejections: true
    })
  ]
});

module.exports = logger;
