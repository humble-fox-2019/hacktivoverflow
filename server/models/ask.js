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
    answres: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answre'
        }
    ]
}, {
    timestamps: true
})

const Ask = mongoose.model('Ask', askSchema)

module.exports = Ask
