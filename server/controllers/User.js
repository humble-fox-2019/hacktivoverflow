
const User = require('../models/User');
const { createToken } = require('../helpers/jwt')
const { compare } = require('../helpers/bcryptjs')

class UserController {
    static create(req, res, next) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
            .then((User) => {
                const token = createToken({ id: User._id, })
                res.status(201).json({
                    username: User.username,
                    email: User.email,
                    token
                })
            })
            .catch(next);
    }

    static login(req, res, next) {
        const { identity, password } = req.body;
        User.findOne({ $or: [{ username: identity }, { email: identity }] })
            .then((User) => {
                if (User && compare(password, User.password)) {
                    const token = createToken({ id: User._id, })
                    res.status(200).json({
                        username: User.username,
                        email: User.email,
                        token
                    })
                } else {
                    let err = new Error('Wrong Username / Email / Password')
                    err.name = 'AuthenticationError'
                    next(err)
                }
            })
            .catch(next);
    }
}

module.exports = UserController
