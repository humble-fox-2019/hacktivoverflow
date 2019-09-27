var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MostSchema = new Schema({
    question : {
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
    }
});
let Most = mongoose.model('Most' , MostSchema)


module.exports = Most