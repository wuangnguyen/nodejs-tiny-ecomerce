const amqp = require('amqplib');
const logger = require('./logger');

module.exports = async (app) => {
  const rabbitmqConfig = app.get('rabbitmq');
  const server = rabbitmqConfig.server;
  const queue = rabbitmqConfig.queue;
  const activityServiceV1 = app.service('v1/activities');

  let connection;
  const connectRabbitMQ = async () => {
    try {
      if (!connection) {
        connection = await amqp.connect(server);
        logger.info('connect to RabbitMQ success');

        const channel = await connection.createChannel();
        await channel.assertQueue(queue);
        await channel.consume(queue, function (msg) {
          try {
            const message = JSON.parse(msg.content.toString());
            const corelationId = message.data.requestInfo.corelationId || '';
            logger.info(`${corelationId} received message from RabbitMQ: ${JSON.stringify(message)}`);
            activityServiceV1.create({ actionType: message.activityType, data: message.data });
          } catch (error) {
            logger.error(error);
          } finally {
            channel.ack(msg);
          }
        });
      }

      connection.on('error', function (err) {
        logger.error(err);
        connection = null;
        setTimeout(connectRabbitMQ, 10000);
      });

      connection.on('close', function () {
        logger.error('connection to RabbitQM closed!');
        connection = null;
        setTimeout(connectRabbitMQ, 10000);
      });
    } catch (err) {
      logger.error(err);
      connection = null;
      setTimeout(connectRabbitMQ, 10000);
    }
  };
  await connectRabbitMQ();
};
