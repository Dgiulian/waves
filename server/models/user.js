require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  }
});
userSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_I)
      .then((salt) => bcrypt.hash(user.password, salt))
      .then(hash => { user.password = hash; next(); })
      .catch(next);
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.generateToken = function () {  
  return jwt.sign(this._id.toHexString(), process.env.SECRET_KEY);
};
userSchema.statics.findByToken = async function (token){
  let user = this;
  const decode = await jwt.verify(token, process.env.SECRET_KEY);
  if (decode) {
    console.log('Decode', decode);
    return user.findOne({'_id': decode, token });
  }
};

const User = mongoose.model('User', userSchema);

module.exports = { User };