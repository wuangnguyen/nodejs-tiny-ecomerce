const BrandSeeder = require('./brand.seeder');
const ColorSeeder = require('./color.seeder');
const ProductSeeder = require('./product.seeder');
const logger = require('../config/logger');

class DbSeeder {
  static async run() {
    await BrandSeeder.run(logger);
    await ColorSeeder.run(logger);
    await ProductSeeder.run(logger, 100);
  }
}

module.exports = DbSeeder;
