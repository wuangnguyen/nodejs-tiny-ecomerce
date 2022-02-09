const { EventBus } = require('domain-events');
const { GetListWithConditionsEvent, GetDetailEvent } = require('./events');
const { publishMessage } = require('../../rabbitmq');

const pushMessageHandler = (aEvent) => {
  publishMessage(aEvent.name(), aEvent.payload());
};
module.exports = () => {
  const eventBus = EventBus.getInstance();
  eventBus.register(pushMessageHandler, GetListWithConditionsEvent.eventName());
  eventBus.register(pushMessageHandler, GetDetailEvent.eventName());
};
