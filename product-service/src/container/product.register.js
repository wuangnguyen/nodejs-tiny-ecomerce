const ProductController = require('../controllers/product.controller');
const ProductService = require('../services/product.service');

module.exports = (container) => {
  container.register('ProductService', ProductService);
  container.register('ProductController', ProductController, ['ProductService']);
  return container;
};
