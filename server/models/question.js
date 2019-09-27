const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    title: { 
      type: String,
      required : [true ,'Title is required']
     },
    description: { 
      type: String,
      required : [true, 'Description is required'] 
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{
      type: Object,
      ref: 'User',
    }],
    dislikes: [{
      type: Object,
      ref: 'User',
    }]
  },
  {
    timestamps: true
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
