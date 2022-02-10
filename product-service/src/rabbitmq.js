const amqp = require('amqplib');
const config = require('./config/config');
const logger = require('./config/logger');

const { server } = config.rabbitmq;
const { queue } = config.rabbitmq;
console.log(config.rabbitmq);

let connection;
let channel;

const connectRabbitMQ = async () => {
  try {
    if (!connection || !channel) {
      connection = await amqp.connect(server);
      logger.info('connect to RabbitMQ success');

      channel = await connection.createChannel();
      await channel.assertQueue(queue);
    }

    connection.on('error', function (err) {
      logger.log(err);
      connection = null;
      channel = null;
      setTimeout(connectRabbitMQ, 10000);
    });

    connection.on('close', function () {
      logger.error('connection to RabbitQM closed!');
      connection = null;
      channel = null;
      setTimeout(connectRabbitMQ, 10000);
    });
  } catch (err) {
    logger.error(err);
    connection = null;
    channel = null;
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
