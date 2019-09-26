const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required : [true, `Title is required`],
  },
  description:  {
    type : String,
    required : [true, `Question is required`],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  answer: [{
    type : Schema.Types.ObjectId,
    ref: 'answer',
  }],
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'users',
  }],
  tags:[],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'users',
  }]
},{
  versionKey: false,
  timestamps: true,
});

let Question = mongoose.model('question', questionSchema)

module.exports = Question
