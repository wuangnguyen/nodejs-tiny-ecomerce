const BrandController = require('../controllers/brand.controller');
const BrandService = require('../services/brand.service');

module.exports = (container) => {
  container.register('BrandService', BrandService);
  container.register('BrandController', BrandController, ['BrandService']);
  return container;
};
