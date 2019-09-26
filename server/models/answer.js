const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  description:  {
    type : String,
    required : [true, `Answer is required`],
  },
  questionId: {
    type : Schema.Types.ObjectId,
    ref: 'question'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'users',
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'users',
  }]
}, {
  versionKey: false,
  timestamps: true,
});

let Answer = mongoose.model('answer', answerSchema)

module.exports = Answer
