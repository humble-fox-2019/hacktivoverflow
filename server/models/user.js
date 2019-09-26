const mongoose = require('mongoose');
const { hash } = require('../helpers/bcrypt')
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true , 'username is required'],
        unique : [true, 'username already registered'],
        minlength : [5, 'username Min(5) Character']
    },
    email : {
        type : String,
        required : [true , 'email is required'],
        unique : [true , 'email already registered'],
        validate : {
            validator ( email ) {
                const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return regex.test( email );
            },
            message ( props ) {
                return `${props.value} is not a valid email format!`
            }
        }
    },
    password : {
        type : String,
        required : [true, 'password is required'],
        minlength : [5 , 'password Min(5) Character']
    },
    tags : {
        type: Array
    }
} , {
    timestamps: true,
    versionKey: false
})

userSchema.pre('save' , function( next ) {
    this.password = hash( this.password )
    next()
})

const User = mongoose.model('User',  userSchema );
module.exports = User