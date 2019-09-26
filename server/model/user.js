var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { hashingPassword  }  = require('../helper')
var UserSchema = new Schema({
  username : {
      type : String,
      required : true
  },
  password : {
      type : String,
      required : true
  },
  email : {
      type : String,
      required : true
  },
  watchedTag : []
});
UserSchema.pre('save' , function(next){
    this.password = hashingPassword(this.password)
    console.log(this.password)
    next()
})
let User = mongoose.model('User' , UserSchema)


module.exports = User