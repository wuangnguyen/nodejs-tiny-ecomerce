var mongoose = require('mongoose');
const { toJSON } = require('./plugins');
var Schema = mongoose.Schema;

var ColorSchema = new Schema({
  name: {
    required: true,
    unique: true,
    type: String
  },
  code: {
    required: true,
    unique: true,
    type: String,
    max: 7
  }
});
ColorSchema.plugin(toJSON);
module.exports = mongoose.model('Color', ColorSchema);
