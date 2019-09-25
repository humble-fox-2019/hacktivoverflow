const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title field is required']
  },
  description: {
    type: String,
    required: [true, 'Description field is required']
  },
  tags: [String],
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const question = mongoose.model('Question', questionSchema)

module.exports = question
