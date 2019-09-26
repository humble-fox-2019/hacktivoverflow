const User = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { tokenGenerate } = require('../helpers/jwt')

class userController {
    static register(req, res, next) {
        const { name, email, password } = req.body
        User.create({
            name, email, password
        })
            .then(user => {
                let payload = {
                    id: user._id,
                    email: user.email
                }
                let token = tokenGenerate(payload)
                res.status(201).json({
                    id: user._id,
                    token: token
                })

            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ email })
            .then(user => {
                if (user && comparePassword(password, user.password)) {
                    let payload = {
                        id: user._id,
                        email: user.email
                    }

                    let token = tokenGenerate(payload)
                    res.status(200).json({
                        id: user._id,
                        token: token
                    })
                } else {
                    next({
                        status: 400,
                        message: `Email/Password Not Valid`
                    })
                }
            })
            .catch(next)
    }
}

module.exports = userController