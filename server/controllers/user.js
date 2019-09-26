const User = require('../models/user');
const { comparePassword } = require('../helpers/bcrypt');
const { generateJWTToken } = require('../helpers/jwt');

class UserController {
    static register(req, res, next){
        const { username, email, password } = req.body
        User.create({
            username,
            email, 
            password
        })
        .then(user =>{
            res.status(201).json({ username: user.username, email: user.email })
        })
        .catch(next)
    }

    static login(req, res, next){
    
        const { email, password } = req.body
        User.findOne({
            email
        })
        .then(user => {
            if(user && comparePassword(password, user.password)){
                let payload = {
                    _id: user._id,
                    email: user.email,
                    username: user.username
                }
                let token = generateJWTToken(payload)
                res.status(200).json({ token, username: user.username, id: user._id })
            }
            else if(user){
                next({status: 400, message: "Invalid password"})
            }
            else{     
                next({status: 400, message: "User does not exist"})
            }
        })
        .catch(next)
    }
}
module.exports = UserController