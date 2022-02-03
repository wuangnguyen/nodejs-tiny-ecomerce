const morgan = require('morgan');
const config = require('./config');
const logger = require('./logger');
var uuid = require('node-uuid');

morgan.token('message', (req, res) => res.locals.errorMessage || '');
morgan.token('corelationId', function getCorelationId(req) {
  return req.corelationId;
});
const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()} :corelationId :method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()} :corelationId :method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) }
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) }
});

const assignCorelationId = (req, res, next) => {
  if (req.corelationId) {
    next();
  } else {
    req.corelationId = uuid.v4();
    next();
  }
};

module.exports = {
  successHandler,
  errorHandler,
  assignCorelationId
};
