const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

module.exports = (productService) => {
  const find = catchAsync(async (req, res) => {
    const products = await productService.find(req.filter, req.options, req.requestInfo);
    res.send(products);
  });

  const findOne = catchAsync(async (req, res) => {
    const product = await productService.findOne(req.params.productId, req.requestInfo);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    res.send(product);
  });

  return {
    find,
    findOne
  };
};
