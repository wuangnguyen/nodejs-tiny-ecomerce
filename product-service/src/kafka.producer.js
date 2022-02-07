const { Kafka } = require('kafkajs');
const config = require('./config/config');
const logger = require('./config/logger');

const client = new Kafka({
  brokers: config.kafka.BROKERS.split(','),
  clientId: config.kafka.CLIENTID
});
const admin = client.admin();

// remember to connect and disconnect when you are done
const createTopicIfNotExists = async () => {
  await admin.connect();
  const topics = await admin.listTopics();
  if (topics.indexOf(config.kafka.TOPIC) === -1) {
    await admin.createTopics({
      topics: [{ topic: config.kafka.TOPIC }]
    });
  }
  await admin.disconnect();
};
createTopicIfNotExists();

const topic = config.kafka.TOPIC;
const producer = client.producer();

const pushMessageToKafka = async (producer, activityType, data) => {
  if (config.env === 'test') {
    logger.info(`pushMessageToKafka. activityType: ${activityType}, payload: ${data}`);
  } else {
    try {
      await producer.connect();
      let payloads = {
        topic: topic,
        messages: [{ key: activityType, value: JSON.stringify(data) }]
      };
      await producer.send(payloads);
      await producer.disconnect();
    } catch (error) {
      logger.error(error);
    }
  }
};

module.exports = {
  producer,
  pushMessageToKafka
};
