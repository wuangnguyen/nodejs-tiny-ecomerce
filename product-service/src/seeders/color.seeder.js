const Color = require('../models/color.model');
const faker = require('faker');

class ColorSeeder {
  static getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  static async run(logger) {
    let isDocumentExists = (await Color.countDocuments()) > 0;
    if (isDocumentExists) {
      return;
    }
    var colors = [];
    for (var i = 0; i < 20; i++) {
      let color = faker.commerce.color();
      if (colors.some((c) => c.name === color)) {
        continue; // prevent insert duplicate data
      }
      colors.push({
        name: color,
        code: this.getRandomColor()
      });
    }

    try {
      await Color.insertMany(colors, { ordered: false });
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = ColorSeeder;
