const Brand = require('../models/brand.model');
const faker = require('faker');
class BrandSeeder {
  static async run(logger) {
    let isDocumentExists = (await Brand.countDocuments()) > 0;
    if (isDocumentExists) {
      return;
    }
    var brands = [];
    for (var i = 0; i < 50; i++) {
      let brand = faker.company.companyName();
      if (brands.some((b) => b.name === brand)) {
        continue; // prevent insert duplicate data
      }
      brands.push({ name: brand });
    }
    try {
      await Brand.insertMany(brands, { ordered: false });
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = BrandSeeder;
