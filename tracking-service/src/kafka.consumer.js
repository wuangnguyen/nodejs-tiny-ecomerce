const { Kafka } = require('kafkajs');
const logger = require('./logger');
module.exports = async (app) => {
  const kafkaConfig = app.get('kafka');
  const kafka = new Kafka({
    clientId: kafkaConfig.CLIENTID,
    brokers: kafkaConfig.BROKERS.split(',')
  });

  const topic = kafkaConfig.TOPIC;
  const consumer = kafka.consumer({
    groupId: kafkaConfig.GROUPID
  });
  const activityServiceV1 = app.service('v1/activities');

  const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const jsonObj = JSON.parse(message.value.toString());
          logger.info(`received a message with content: ${jsonObj}`);
          activityServiceV1.create({ actionType: message.key.toString(), data: jsonObj });
        } catch (error) {
          logger.error('err=', error);
        }
      }
    });
  };
  await run().catch((e) => logger.error(`[kafka consumer] ${e.message}`, e));
};
