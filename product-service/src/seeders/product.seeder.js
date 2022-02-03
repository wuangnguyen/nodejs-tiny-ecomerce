const Product = require('../models/product.model');
const Brand = require('../models/brand.model');
const Color = require('../models/color.model');
const FakeProduct = require('./fake.product');
const faker = require('faker');

class ProductSeeder {
  static async run(logger, totalItems) {
    // let isDocumentExists = (await Product.countDocuments()) > 0;
    // if (isDocumentExists) {
    //   return;
    // }
    let brands = await Brand.find({}).exec();
    let colors = await Color.find({}).exec();
    let batchSize = 10;
    let loopTime = totalItems / batchSize;
    const insertMany = async (itemCount) => {
      let products = [];
      for (let i = 0; i < itemCount; i++) {
        let brand = brands[Math.floor(Math.random() * brands.length)];
        let numberOfColor = Math.floor(Math.random() * 4 + 1);
        let name = faker.commerce.productName();
        let product = new FakeProduct(name);
        product.addBrand(brand);
        for (let i = 0; i < numberOfColor; i++) {
          let color = colors[Math.floor(Math.random() * colors.length)];
          product.addColors(color);
        }
        let hasAttributes = Math.floor(Math.random() * 2);
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
