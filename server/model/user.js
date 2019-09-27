const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const {
    hashPass

} = require('../helper/hash')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                let check = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return check.test(value)
            },
            message: 'Not a valid email format!'
        }
    },
    user_name: {
        type: String,
        required: [true, 'name Required']
    }

    ,
    password: {
        type: String,
        required: [true, 'Password Required']
    },
    upVoteQuestion: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],
    upVoteAnswer: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    downVoteAnswer: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    downVoteQuestion: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }]

}, {
    timestamps: true
})

userSchema.pre('save', function (next) {
    // const salt = bcrypt.genSaltSync(10)
    const hash = hashPass(this.password);
    this.password = hash
    console.log(hash, '<< INI HASH PASSWORD DI MODEL UNTUK USER')
    console.log(this.password, '<< APAKAH SUDAH DI HASH PASSWORDNYA??')
    next()
})

userSchema.pre('save', function (next) {
    return User.findOne({
            email: this.email
        })
        .then(user => {
            if (user) {
                throw new Error('Email already in used.')
            } else {
                next()
            }
        })
})

const User = mongoose.model('User', userSchema)

module.exports = User;