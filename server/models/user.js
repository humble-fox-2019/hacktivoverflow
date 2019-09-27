const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"]
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"]
  }
}, {
  timestamps: true
})

userSchema.path('email').validate(function (value) {
  return User.findOne({ email: value })
      .then(isFound => {
          if (isFound) return false
      })
      .catch(err => {
          throw err;
      })
}, 'Email already exist')

userSchema.pre('save', function () {
  this.password = hashPassword(this.password)
  next()
})


const User = mongoose.model('User', userSchema)

module.exports = User

