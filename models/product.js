const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
  },
  description: {
    type:String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.ObjectId,
    ref: 'Category',
    required: true
  },
  image:{
    data: Buffer,
    contentType: String,
  },
  shipping: {
    type: Boolean
  }

}, {timestamps: true});

exports.Product = mongoose.model('Product', productSchema);
