const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title must be filled"]
    },
    description: {
        type: String,
        required: [true, "Description must be filled"]
    },
    upvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            defualt: []
        }
    ],
    downvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            defualt: []
        }
    ],
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: "Answer"
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

},{timestamps: true})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question

