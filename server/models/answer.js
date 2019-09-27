const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId, ref: 'Question'
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    title: {
        type: String,
        required: [true, `Question title can not be empty`]
    },
    content: {
        type: String,
        required: [true, `Question content can not be empty`]
    },
    downvote: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    upvote: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }]
}, {
        timestamps: true,
        versionKey: false
    });

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;