const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title required']
  },
  content: {
    type: String,
    required: [true, 'Content required']
  },
  upvote: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  downvote: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  tags: {
    type: Array,
    required: [true, 'Tag required - minimal 1'],
    default: undefined
  }
}, {
  timestamps: true
})

const Question = mongoose.model('Question', questionSchema)


module.exports = Question
