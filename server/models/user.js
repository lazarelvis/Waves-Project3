const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_I = 10; //10 is the cost factor; 2^10 iterations of the key derivation
require("dotenv").config();

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

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_I, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  //cb, call-back function after checking password
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });

  //user.id+password and generate a token
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, process.env.SECRET, function (err, decode) {
    //decoding and grab user id
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);

      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };

//token is used to enter on private routes
