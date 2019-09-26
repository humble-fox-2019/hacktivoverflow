const { User } = require('../model');
const {  compare ,  signToken } = require('../helper');
class user_controller {
    static Register(req,res,next){
        let {username, password , email} = req.body
        User.create({
            username,password, email
        })
        .then(user=>{
            res.status(201).json({
                token : signToken(user),
                user
            })  
        })
        .catch(err=>{
            next(err)
        })
    }

    static login(req,res,next){
        let {  email , password } = req.body;
        User.findOne({
            email
        })
        .then(user=>{
            if(user){
                if(compare(password , user.password)){
                    res.json({
                        token : signToken(user),
                        user
                    })
                }
                else {
                    next({
                        status : 400 ,
                        message : 'Username or Password Not Found'
                    })
                }
            }
            else {
                next({
                    status : 400 ,
                    message : 'Username or Password Not Found'
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static addWathcTag(req,res,next) {
        let { newTag } = req.body
        User.findById(req.decode.data._id)
        .then(user=>{
            user.watchedTag = newTag
            user.save()
        })
        .catch(next)
    }

    static getWatchTag(req,res,next){
        User.findById(req.decode.data._id)
        .then(user=>{
            res.json(user.watchedTag)
        })
        .catch(next)
    }
}

module.exports = user_controller