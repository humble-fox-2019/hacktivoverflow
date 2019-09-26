const User = require('../models/user');
const { compare } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
    static login ( req, res ,next ) {
        const { email , password } = req.body;
        User.findOne({ email })
        .then ( found => {
            if ( found ) {
                if ( compare( password , found.password ) ) {
                    const payload = {
                        id : found.id,
                        email : found.email,
                        username : found.username,
                        tags : found.tags
                    }
                    const token = generateToken ( payload )
                    res.status(200).json({ token , user: payload })
                } else {
                    next({ status : 400 , message : "invalid email / password"})
                }
            } else {
                next({ status : 400 , message : "invalid email / password"})
            }
        }) 
        .catch( next )
    }  
    static register( req, res ,next ) {
        const { username , email , password } = req.body;
        User.create({ username , email , password }) 
        .then ( createdUser => {
            res.status(201).json( createdUser )
        })
        .catch( next )
        
    }
    static updateTag( req ,res ,next ) {
        const { tags } = req.body;
        const userId = req.decode.id
        User.findOneAndUpdate({ _id : userId } , { tags })
        .then( user => {
            res.status(200).json( user )
        })
        .catch( next )
    }
    static getUserTag ( req, res ,next ) {
        const userId = req.decode.id
        User.findById( userId )
        .then( user => {
            if ( user ) 
                res.status(200).json( user.tags )
            else 
                next({ status : 404 , message : "User Not Found" })
        })
        .catch( next )
    }
}

module.exports = UserController