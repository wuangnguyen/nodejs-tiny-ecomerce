var mongoose = require('mongoose');
const { paginate, toJSON } = require('./plugins');
var Schema = mongoose.Schema;

var BrandSchema = new Schema({
  name: {
    required: true,
    unique: true,
    type: String
  }
});
BrandSchema.plugin(toJSON);
BrandSchema.plugin(paginate);

module.exports = mongoose.model('Brand', BrandSchema);
