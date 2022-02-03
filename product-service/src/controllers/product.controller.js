const aqp = require('api-query-params');
const catchAsync = require('../utils/catchAsync');

module.exports = (productService) => {
  const find = catchAsync(async (req, res) => {
    const { filter, skip, limit, sort } = aqp(req.query, {
      skipKey: 'page'
    });
    const options = {
      page: skip,
      limit,
      sort
    };
    const products = await productService.find(filter, options, req.requestInfo);
    res.send(products);
  });

  return {
    find
  };
};
