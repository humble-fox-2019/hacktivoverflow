const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

answerSchema = new Schema({
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
    qId : {
        type : ObjectId,
        ref : 'Question'
    },
    owner : {
        type : ObjectId,
        ref : 'User'
    }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer