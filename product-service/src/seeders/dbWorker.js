const { parentPort } = require('worker_threads');
const mongoose = require('mongoose');
const DbSeeder = require('./index');
const logger = require('../config/logger');

parentPort.on('message', async (config) => {
  await mongoose.connect(config.mongoose.url, config.mongoose.options);
  await DbSeeder.run();
});
