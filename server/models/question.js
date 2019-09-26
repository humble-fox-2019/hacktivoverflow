const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
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
    }],
    tags: {
        type: Array
    }
}, {
    timestamps: true,
    versionKey: false,
});

QuestionSchema.virtual('totalVotes').get(function () {
    return this.upvote.length - this.downvote.length
})

QuestionSchema.set('toJSON', { virtuals: true });

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;