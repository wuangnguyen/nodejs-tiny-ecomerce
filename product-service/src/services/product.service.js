const { EventBus } = require('domain-events');
const Product = require('../models/product.model');
const { GetListWithConditionsEvent, GetDetailEvent } = require('../domain-events/product/events');

class ProductService {
  /**
   * Query for products
   * @param {Object} filter - Mongo filter
   * @param {Object} options - Query options
   * @param {string} [options.sort] - Sort option in the format: sortField:(desc|asc)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  async find(filter, options, requestInfo) {
    const eventBus = EventBus.getInstance();
    const aEvent = new GetListWithConditionsEvent({ requestInfo, filter, options });
    eventBus.dispatch(aEvent);
    return await Product.paginate(filter, options);
  }

  /**
   * Get product by id
   * @param {ObjectId} id
   * @returns {Promise<User>}
   */
  async findOne(id, requestInfo) {
    const eventBus = EventBus.getInstance();
    const aEvent = new GetDetailEvent({ requestInfo, params: id });
    eventBus.dispatch(aEvent);
    return await Product.findById(id);
  }
}

module.exports = ProductService;
