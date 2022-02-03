/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
const initKafkaConsumer = require('./kafka.consumer');
process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: Promise ', p, reason));
const seedDefaultUser = async () => {
  // this for local testing purpose only.
  let userService = app.service('users');
  var defaultUser = await userService.find({ email: 'admin@local.com' });
  if (defaultUser.data.length == 0) {
    await userService.create({ email: 'admin@local.com', password: 'admin' });
  }
};
server.on('listening', () => {
  logger.info('Tracking application started on http://%s:%d', app.get('host'), port);
  seedDefaultUser();
  initKafkaConsumer(app);
});
