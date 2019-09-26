const mongoose =require('mongoose');
const answerSchema = new mongoose.Schema({
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
        ref : 'User' 
    }],
    downVote : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps: true,
    versionKey: false
})

const Answer = mongoose.model('Answer' , answerSchema);
module.exports = Answer;