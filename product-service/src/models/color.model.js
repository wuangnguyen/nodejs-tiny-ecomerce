var mongoose = require('mongoose');
const { paginate, toJSON } = require('./plugins');
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
ColorSchema.plugin(paginate);

module.exports = mongoose.model('Color', ColorSchema);
