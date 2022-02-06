const catchAsync = require('../utils/catchAsync');

module.exports = (productService) => {
  const find = catchAsync(async (req, res) => {
    console.log('From controller');
    console.log(JSON.stringify(req.filter));
    console.log(JSON.stringify(req.options));
    console.log(JSON.stringify(req.requestInfo));
    const products = await productService.find(req.filter, req.options, req.requestInfo);
    res.send(products);
  });

  return {
    find
  };
};
