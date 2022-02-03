const { parentPort } = require('worker_threads');
const DbSeeder = require('./index');
const mongoose = require('mongoose');
const logger = require('../config/logger');
parentPort.on('message', async (config) => {
  await mongoose.connect(config.mongoose.url, config.mongoose.options);
  await DbSeeder.run();
});
