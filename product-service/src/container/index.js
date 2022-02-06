const Container = require('plus.container');
const ConfigureProduct = require('./product.register');
const ConfigureBrand = require('./brand.register');
const ConfigureColor = require('./color.register');

var DiContainer = (function () {
  var instance;

  function createInstance() {
    instance = new Container();
    ConfigureProduct(instance);
    ConfigureBrand(instance);
    ConfigureColor(instance);
    return instance;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

module.exports = DiContainer;
