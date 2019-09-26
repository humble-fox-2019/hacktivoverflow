const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Description is requires']
  },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }
}, { timestamps: true })

module.exports = mongoose.model('Answer', answerSchema)