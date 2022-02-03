const DomainEvent = require('domain-events').DomainEvent;

const PRODUCT_EVENTS = {
  GET_LIST_WITH_CONDITIONS: 'Product.GetListWithConditions',
  GET_DETAIL: 'Product.GetDetail'
};

class GetListWithConditionsEvent extends DomainEvent {
  static eventName() {
    return PRODUCT_EVENTS.GET_LIST_WITH_CONDITIONS;
  }

  constructor(payload) {
    super(PRODUCT_EVENTS.GET_LIST_WITH_CONDITIONS, payload);
    this.eventPayload = payload;
  }
  payload = () => {
    return JSON.parse(JSON.stringify(this.eventPayload, this.stringifyFilter));
  };
  stringifyFilter = (key, value) => {
    if (value instanceof RegExp) {
      return value.toString();
    }
    return value;
  };
}
class GetDetailEvent extends DomainEvent {
  static eventName() {
    return PRODUCT_EVENTS.GET_DETAIL;
  }

  constructor(payload) {
    super(PRODUCT_EVENTS.GET_DETAIL, payload);
  }
  payload = () => {
    return JSON.parse(JSON.stringify(this.eventPayload, this.stringifyFilter));
  };
  stringifyFilter = (key, value) => {
    if (value instanceof RegExp) {
      return value.toString();
    }
    return value;
  };
}
module.exports = {
  GetListWithConditionsEvent,
  GetDetailEvent
};
