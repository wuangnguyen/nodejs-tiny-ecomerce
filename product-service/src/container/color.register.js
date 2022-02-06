const ColorController = require('../controllers/color.controller');
const ColorService = require('../services/color.service');

module.exports = (container) => {
  container.register('ColorService', ColorService);
  container.register('ColorController', ColorController, ['ColorService']);
  return container;
};
