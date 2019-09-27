const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
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
  }
},{
  timestamps: true
})

const Answer = mongoose.model('Answer', answerSchema)


module.exports = Answer

