const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { hashPassword } = require('../helpers/bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, `name must be filled`]
    },
    email: {
        type: String,
        required: [true, `email must be filled`],
        unique: [true, `Email has been registered`],
        validate: {
            validator: function (val) {
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
            },
            message: `Email Format is not Valid`
        }
    },
    password: {
        type: String,
        required: [true, `password must be filled`],
    }
}, {
        timestamps: true
    })

userSchema.plugin(uniqueValidator)

userSchema.pre('save', function (next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User