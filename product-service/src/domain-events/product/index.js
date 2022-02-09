const EventBus = require('domain-events').EventBus;
const { GetListWithConditionsEvent, GetDetailEvent } = require('./events');
const { publishMessage } = require('../../rabbitmq');

const pushMessageHandler = (aEvent) => {
  publishMessage(aEvent.name(), aEvent.payload());
};
module.exports = () => {
  let eventBus = EventBus.getInstance();
  eventBus.register(pushMessageHandler, GetListWithConditionsEvent.eventName());
  eventBus.register(pushMessageHandler, GetDetailEvent.eventName());
};
