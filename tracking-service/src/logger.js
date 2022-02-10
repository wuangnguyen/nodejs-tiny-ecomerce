const { createLogger, format, transports } = require('winston');
const { SeqTransport } = require('@datalust/winston-seq');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');

const config = feathers().configure(configuration());
// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(format.splat(), format.simple()),
  transports: [
    new transports.Console(),
    new SeqTransport({
      serverUrl: `http://${config.get('seq').host}:5341`,
      onError: (e) => {
        console.error(e);
      },
      handleExceptions: true,
      handleRejections: true
    })
  ]
});

module.exports = logger;
