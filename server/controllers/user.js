const { generateToken } = require('../helpers/jwt')
const { compareHash } = require('../helpers/bcrypt')
const User = require('../models/user')

class UserController {
    static login (req,res,next) {
        User.findOne({username : req.body.username})
        .then((user)=>{
            if (user){
                //password check here please
                if (compareHash(req.body.password,user.password)){
                    return user
                } else {
                    next({status:401, message : 'wrong password/username'})
                }
            } else {
                return User.create({
                    username : req.body.username,
                    email : req.body.email,
                    password : req.body.password
                })
            }
        })
        .then((user)=>{
            const payload = {
                id : user._id,
                username : user.username,
                email : user.email
            }
            const token = generateToken(payload)
            res.status(200).json({
                token
            })
        })
        .catch(next)
    }

    static read (req,res,next){
        User.find().then((users)=>{
            res.status(200).json({
                users
            })
        }).catch(next)
    }
}

module.exports = UserController