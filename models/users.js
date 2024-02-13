const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: true,
    },
    phoneNumber: {type: Number, required: true},
    address: {type: String, required: true},
    password: { type: String, minLength: 8, required: true },
    role: {type: Number, default: 0},
    token: String
}, {timestamps: true});

exports.User = mongoose.model('User', userSchema);