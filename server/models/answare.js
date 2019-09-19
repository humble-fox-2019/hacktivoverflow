const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answareSchema = new Schema({
  content: {
          type: String,
          required: [true, 'content is required']
      }
}, {
    timestamps: true
})

const Answare = mongoose.model('Answare', answareSchema)

module.exports = Answare
