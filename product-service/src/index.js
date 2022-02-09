const config = require('./config/config');
const logger = require('./config/logger');
const app = require('./app');
const Server = require('./server');
const mongoose = require('mongoose');
const registerProductDomainEvents = require('./domain-events/product');
const { Worker } = require('worker_threads');

const main = async () => {
  if (config.env != 'test') {
    const worker = new Worker(__dirname + '/seeders/dbWorker.js');
    worker.postMessage(config);
  }
  await mongoose.connect(config.mongoose.url, config.mongoose.options);
  logger.info('Connected to MongoDB');
  const server = new Server(config, logger);
  await server.start(app);
  registerProductDomainEvents();
};

main();
