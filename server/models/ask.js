const mongoose = require('mongoose')
const Schema = mongoose.Schema

const askSchema = new Schema({
  title: {
          type: String,
          required: [true, 'title is required']
      },
content: {
          type: String,
          required: [true, 'content is required']
      },
answers: {
          type: Array,
          required: [true, 'answers is required']
      }
}, {
    timestamps: true
})

const Ask = mongoose.model('Ask', askSchema)

module.exports = Ask
