const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description : {
        type: String,
        required: [true, 'description is required']
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'userId is required']
    },
    upVote : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User' ,
    }],
    downVote : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    answers : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Answer'
    }],
    tags : {
        type: Array
    }
}, {
    timestamps: true,
    versionKey: false
})

const Question = mongoose.model('Question', questionSchema );
module.exports = Question