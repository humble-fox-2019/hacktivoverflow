const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    content: {
        type: String,
        required: [true, 'content is required']
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
    }],
    solution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
    },
    tags: {
        type: Array,
        dafault: []
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
