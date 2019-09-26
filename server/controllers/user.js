const User = require('../models/user');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {


    static info(req, res, next){
        const _id = req.decode._id;
        User.findOne({
            _id
        })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(next);
    }

    static addWatcher(req, res, next){
        const _id = req.decode._id;
        const { tag } = req.body;
        User.findOneAndUpdate({
            _id
        },{
            $push:{ watchers: tag}
        },{
            new: true
        })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(next)
    }

    static create(req, res, next) {
        const { email, password } = req.body;

        User.create({
            email,
            password
        })
            .then(function (user) {
                let payload = {
                    _id: user._id,
                    username: user.username,
                }
                let token = generateToken(payload)
                res.status(200).json({
                    token
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then((user) => {
                if (user) {
                    if (comparePassword(req.body.password, user.password)) {
                        let payload = {
                            _id: user._id,
                            email: user.email,
                        }
                        let token = generateToken(payload)
                        res.status(200).json({
                            token
                        })
                    }
                    else {
                        throw { code: 404, message: "wrong email/password" }
                    }
                }
                else {
                    throw { code: 404, message: "wrong email/password" }
                }
            })
            .catch(next)
    }


}

module.exports = UserController;