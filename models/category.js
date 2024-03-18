const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
   name: {
    type: String,
    required: true,
    unique: true
   },
   slug: {
     type: String,
     lowarcase: true
   }
});

exports.Category = mongoose.model('Category', categorySchema);