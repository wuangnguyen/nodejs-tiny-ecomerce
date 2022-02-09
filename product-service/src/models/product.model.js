const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const { Schema } = mongoose;
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    code: {
      type: String,
      unique: true
    },
    title: String,
    description: String,
    price: {
      type: Number,
      default: 0
    },
    brand: {
      id: {
        type: Schema.Types.ObjectId
      },
      name: String
    },
    images: Array,
    colors: [
      {
        id: {
          type: Schema.Types.ObjectId
        },
        name: String,
        code: {
          type: String,
          max: 7
        },
        images: Array
      }
    ],
    attributes: [Schema.Types.Mixed],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: true
  }
);

ProductSchema.plugin(toJSON);
ProductSchema.plugin(paginate);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
