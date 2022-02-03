const { Kafka } = require('kafkajs');
const config = require('./config/config');

const client = new Kafka({
  brokers: config.kafka.BROKERS.split(','),
  clientId: config.kafka.CLIENTID
});

const topic = config.kafka.TOPIC;
const producer = client.producer();

const pushMessageToKafka = async (producer, activityType, data) => {
  await producer.connect();
  let payloads = {
    topic: topic,
    messages: [{ key: activityType, value: JSON.stringify(data) }]
  };
  await producer.send(payloads);
  await producer.disconnect();
};

module.exports = {
  producer,
  pushMessageToKafka
};
