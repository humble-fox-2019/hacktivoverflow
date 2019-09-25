const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    description: {
        type: String,
        required: [true, `Description must be filled`]
    },
    upvote: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    downvote: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer