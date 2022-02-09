const faker = require('faker');
const Product = require('../models/product.model');
const Brand = require('../models/brand.model');
const Color = require('../models/color.model');
const FakeProduct = require('./fake.product');

class ProductSeeder {
  static async run(logger, totalItems) {
    const isDocumentExists = (await Product.countDocuments()) > 0;
    if (isDocumentExists) {
      return;
    }
    const brands = await Brand.find({}).exec();
    const colors = await Color.find({}).exec();
    const batchSize = 10;
    const loopTime = totalItems / batchSize;
    const insertMany = async (itemCount) => {
      const products = [];
      for (let i = 0; i < itemCount; i++) {
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const numberOfColor = Math.floor(Math.random() * 4 + 1);
        const name = faker.commerce.productName();
        const product = new FakeProduct(name);
        product.addBrand(brand);
        for (let i = 0; i < numberOfColor; i++) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          product.addColors(color);
        }
        const hasAttributes = Math.floor(Math.random() * 2);
        if (hasAttributes == 1) {
          product.addAttributes();
        }
        products.push(product.build());
      }
      try {
        await Product.insertMany(products, { oerdered: false });
      } catch (_) {}
    };
    for (let i = 0; i < loopTime; i++) {
      insertMany(batchSize);
    }
    if (totalItems % batchSize > 0) {
      insertMany(totalItems % batchSize);
    }
  }
}

module.exports = ProductSeeder;
