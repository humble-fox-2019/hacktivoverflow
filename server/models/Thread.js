const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ThreadSchema = new Schema({
  "title": { "type": "String", "required": [true, "Title is required"] },
  "body": { "type": "String", "required": [true, "Body is required"] },
  "replies": { "type": [{ type: Schema.Types.ObjectId, ref: "Thread" }] },
  "owner": { type: Schema.Types.ObjectId, ref: "User" },
  "upvotes": [{ type: Schema.Types.ObjectId, ref: "User" }],
  "downvotes": [{ type: Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true })

const Thread = mongoose.model('Thread', ThreadSchema)

module.exports = Thread