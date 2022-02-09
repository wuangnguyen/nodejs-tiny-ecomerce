const Color = require('../models/color.model');

class ColorService {
  /**
   * Query for colors
   * @param {Object} filter - Mongo filter
   * @param {Object} options - Query options
   * @param {string} [options.sort] - Sort option in the format: sortField:(desc|asc)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  async find(filter, options) {
    return await Color.paginate(filter, options);
  }
}

module.exports = ColorService;
