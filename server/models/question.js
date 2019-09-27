const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

questionSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    upvotes : {
        type : Number,
        default : 0
    },
    downvotes : {
        type : Number,
        default : 0
    },
    tags : [],
    answers : [{
        type : ObjectId,
        ref : 'Answer'
    }],
    owner : {
        type : ObjectId,
        ref : 'User'
    }
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question