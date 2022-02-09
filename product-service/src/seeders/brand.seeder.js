const faker = require('faker');
const Brand = require('../models/brand.model');

class BrandSeeder {
  static async run(logger) {
    const isDocumentExists = (await Brand.countDocuments()) > 0;
    if (isDocumentExists) {
      return;
    }
    const brands = [];
    for (let i = 0; i < 50; i++) {
      const brand = faker.company.companyName();
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
