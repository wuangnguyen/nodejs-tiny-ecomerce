const catchAsync = require('../utils/catchAsync');

module.exports = (colorService) => {
  const find = catchAsync(async (req, res) => {
    const colors = await colorService.find(req.filter, req.options);
    res.send(colors);
  });

  return {
    find
  };
};
