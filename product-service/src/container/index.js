const Container = require('plus.container');
const ConfigureProduct = require('./product.register');
const ConfigureBrand = require('./brand.register');
const ConfigureColor = require('./color.register');

const DiContainer = (function () {
  let instance;

  function createInstance() {
    instance = new Container();
    ConfigureProduct(instance);
    ConfigureBrand(instance);
    ConfigureColor(instance);
    return instance;
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

module.exports = DiContainer;
