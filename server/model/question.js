const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    voter : 
    [
        {
            User : {
                type : Schema.Types.ObjectId,
                ref : 'User'
            },
            status : {
                type : String
            }

        }
    ],
    votes : {
        type : Number,
        ref : 'User',
        default : 0
    },
    tags : [{type: Schema.Types.ObjectId, ref: 'tag'}],
    Answer : [{type: Schema.Types.ObjectId, ref: 'answer'}],
    User : {type: Schema.Types.ObjectId, ref: 'User'}

},{timestamps : { createdAt : 'created_at'}});

let question = mongoose.model('question' , questionSchema)


module.exports = question