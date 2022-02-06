const catchAsync = require('../utils/catchAsync');

module.exports = (brandService) => {
  const find = catchAsync(async (req, res) => {
    const brands = await brandService.find(req.filter, req.options);
    res.send(brands);
  });

  return {
    find
  };
};
