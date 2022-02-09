const faker = require('faker');
const Color = require('../models/color.model');

class ColorSeeder {
  static getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  static async run(logger) {
    const isDocumentExists = (await Color.countDocuments()) > 0;
    if (isDocumentExists) {
      return;
    }
    const colors = [];
    for (let i = 0; i < 20; i++) {
      const color = faker.commerce.color();
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
