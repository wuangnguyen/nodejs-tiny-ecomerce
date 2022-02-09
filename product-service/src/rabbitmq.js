const amqp = require('amqplib');
const config = require('./config/config');
const logger = require('./config/logger');

const server = config.rabbitmq.server;
const queue = config.rabbitmq.queue;
console.log(config.rabbitmq);

var connection;
var channel;

const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(server);
    logger.info('connect to RabbitMQ success');

    channel = await connection.createChannel();
    await channel.assertQueue(queue);

    connection.on('error', function (err) {
      logger.log(err);
      setTimeout(connectRabbitMQ, 10000);
    });

    connection.on('close', function () {
      logger.error('connection to RabbitQM closed!');
      setTimeout(connectRabbitMQ, 10000);
    });
  } catch (err) {
    logger.error(err);
    setTimeout(connectRabbitMQ, 10000);
  }
};

connectRabbitMQ();

const publishMessage = (activityType, data) => {
  const message = { activityType, data };
  return channel.sendToQueue(queue, Buffer.from(JSON.stringify(message), 'utf8'));
};
module.exports = {
  publishMessage
};
