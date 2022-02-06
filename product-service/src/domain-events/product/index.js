const EventBus = require('domain-events').EventBus;
const { GetListWithConditionsEvent, GetDetailEvent } = require('./events');
const { producer, pushMessageToKafka } = require('../../kafka.producer');

const pushMessageHandler = (aEvent) => {
  pushMessageToKafka(producer, aEvent.name(), aEvent.payload());
};
module.exports = () => {
  let eventBus = EventBus.getInstance();
  eventBus.register(pushMessageHandler, GetListWithConditionsEvent.eventName());
  eventBus.register(pushMessageHandler, GetDetailEvent.eventName());
};
