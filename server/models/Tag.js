const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
    UserId : {
        type : Schema.Types.ObjectId,
        required : [true, "UserId required"]
    },
    name : {
        type : String,
        required : [true, "tagname is required"]
    },
    tags : [{
        type : String
    }]
},
{
    timestamps : true,
    versionKey : false
})

const Tag = mongoose.model("Tag", tagSchema)

module.exports = Tag
