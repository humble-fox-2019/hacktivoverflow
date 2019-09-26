const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username required'],
    minlength: [3, 'Username min 3 characters'],
    maxlength: [20, 'Username max 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Email required']
  },
  password: {
    type: String,
    required: [true, 'Password required']
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  watchTags: {
    type: Array
  }
})

userSchema.path('email').validate(function(value) {
  return User.findOne({ email: value })
    .then(user => {
      if(user) {
        return false
      }
    })
  }, 'Email already registered')

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

