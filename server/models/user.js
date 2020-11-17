const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/encrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    validate: [
      {
        validator: function(email) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        },
        msg: 'Email format is invalid'
      },
      {
        validator: function(email) {
          return mongoose.models.User.findOne({ email })
                  .then(user => {
                    if (user) return false
                    else return true
                  })
                  .catch(_ => {
                    return true
                  })
        },
        msg: 'Email already used'
      }
    ]
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
    minlength: [6, 'Password min 6 characters']
  },

  image: {
    type: String,
    default: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'
  }
}, { timestamps: true })

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
