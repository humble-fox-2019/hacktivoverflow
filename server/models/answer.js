const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const answerSchema = new Schema({
    description: {
        type: String,
        required: [true, "Description must be filled"]
    },
    upvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    question:{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer

