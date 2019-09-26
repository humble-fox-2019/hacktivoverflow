const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema ({
    UserId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    upvotes : [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }],
    downvotes : [{
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    }],
    QuestionId :{
        type : Schema.Types.ObjectId,
        ref : "Question",
        required : true
    }
},{
    timestamps : true,
    versionKey : false
})

const Answer = mongoose.model("Answer", answerSchema)

module.exports = Answer
