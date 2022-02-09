const mongoose = require('mongoose');
const { paginate, toJSON } = require('./plugins');

const { Schema } = mongoose;

const BrandSchema = new Schema({
  name: {
    required: true,
    unique: true,
    type: String
  }
});
BrandSchema.plugin(toJSON);
BrandSchema.plugin(paginate);

module.exports = mongoose.model('Brand', BrandSchema);
