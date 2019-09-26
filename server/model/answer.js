const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    upVotes: {
        type: Number
    },
    downVotes: {
        type: Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const answer = mongoose.model('answer', answerSchema)
module.exports = answer