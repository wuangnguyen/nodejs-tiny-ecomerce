const Product = require('../models/product.model');
const EventBus = require('domain-events').EventBus;
const { GetListWithConditionsEvent } = require('../domain-events/product/events');
class ProductService {
  async find(filter, options, requestInfo) {
    const eventBus = EventBus.getInstance();
    const aEvent = new GetListWithConditionsEvent({ requestInfo, filter, options });
    eventBus.dispatch(aEvent);
    return await Product.paginate(filter, options);
  }
}

module.exports = ProductService;
