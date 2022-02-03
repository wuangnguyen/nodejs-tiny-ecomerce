var mongoose = require('mongoose');
const { toJSON } = require('./plugins');
var Schema = mongoose.Schema;

var BrandSchema = new Schema({
  name: {
    required: true,
    unique: true,
    type: String
  }
});
BrandSchema.plugin(toJSON);
module.exports = mongoose.model('Brand', BrandSchema);
