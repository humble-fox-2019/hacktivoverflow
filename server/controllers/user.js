const User = require('../models/User')
const { comparePassword } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')

class UserController {

  static signin(req, res, next) {
    const { email, password } = req.body

    let errors = []
    if(!email) {
      errors.push('Email required')
    }
    if(!password) {
      errors.push('Password required')
    }
    if(errors.length > 0) {
      res.status(400).json({
        errors
      })
    }else {
      User.findOne({ email })
        .then(user => {
          if(user) {
            if(comparePassword(password, user.password)) {
              const payload = {
                id: user._id,
                username: user.username,
                email: user.email,
              }
              const token = sign(payload)
              res.json({
                token
              })
            }else {
              return next({
                status: 401,
                message: 'Wrong Email/Password'
              })
            }
          }else{
            return next({
              status: 401,
              message: 'Wrong Email/Password'
            })
          }
        })
      }
    }

  static signup(req, res, next) {
    const { username, email, password } = req.body

    User.create({ username, email, password })
      .then(user => {
        let username = user.username
        let email = user.email

        const payload = {
          id: user._id,
          username: user.username,
          email: user.email,
        }
        const token = sign(payload)
        res.json({
          token
        })
      })
      .catch(next)
  }

  static getUserData(req, res, next) {

    User.findById(req.decode.id, 'username email watchTags')
      .then(user => {
        res.json(({ user }))
      })
      .catch(next)

  }

  static addTag(req, res, next) {

    User.findByIdAndUpdate(req.decode.id, {
      $push: {
        watchTags: req.body.tag
      }
    }, {
      new: true,
      useFindAndModify: false
    })
    .then(user => {
      res.json({ tags: user.watchTags })
    })
    .catch(next)
  }

  static removeTag(req, res, next) {

    User.findByIdAndUpdate(req.decode.id, {
      $pull: {
        watchTags: req.body.tag
      }
    }, {
      new: true,
      useFindAndModify: false
    })
    .then(user => {
      res.json({ tags: user.watchTags })
    })
    .catch(next)
  }
}
module.exports = UserController

