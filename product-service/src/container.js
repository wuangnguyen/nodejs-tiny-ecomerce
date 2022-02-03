const Container = require('plus.container');
const ProductController = require('./controllers/product.controller');
const ProductService = require('./services/product.service');

const container = new Container();
container.register('ProductService', ProductService);
container.register('ProductController', ProductController, ['ProductService']);
Object.freeze(container);
module.exports = container;
