const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, `title must be filled`]
    },
    description: {
        type: String,
        required: [true, `Description must be filled`]
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    answer: [{
        type: Schema.Types.ObjectId,
        ref: "Answer"
    }]
})

questionSchema.pre('save', function (next) {
    this.upvote = this.upvote
    this.downvote = this.downvote
    this.answer = this.answer
    next()
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question