require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const SALT_I = 10;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  resetToken: {
    type: String
  },
  resetTokenExp: {
    type: Number
  }
});
userSchema.pre('save', function(next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt
      .genSalt(SALT_I)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => {
        user.password = hash;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.generateToken = function() {
  return jwt.sign(this._id.toHexString(), process.env.SECRET_KEY);
};

userSchema.methods.generateResetToken = async function() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buffer) => {
      const token = buffer.toString('hex');
      const today = moment()
        .startOf('day')
        .valueOf();
      const tomorrow = moment(today)
        .endOf('day')
        .valueOf();
      this.resetToken = token;

      // this.resetTokenExp = Date.now() + 24*60*60*1000;
      
      this.resetTokenExp = tomorrow;
      this.save((err, user) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(user);
        }
      });
    });
  });
};

userSchema.statics.findByToken = async function(token) {
  let user = this;
  const decode = await jwt.verify(token, process.env.SECRET_KEY);
  if (decode) {
    return user.findOne({ _id: decode, token });
  } else return null;
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
