const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true, //"  hello", or "hello ", or "  hello ", would end up being saved as "hello"
    unique: 1, //true
  },
  password: {
    type: String,
    require: true,
    minlength: 5,
  },
  name: {
    type: String,
    require: true,
    maxlength: 100,
  },
  lastname: {
    type: String,
    require: true,
    maxlength: 100,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
    require: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
