require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const mongoose = require('mongoose')
const index = require('./routes')
// const databse = 'mongodb://localhost:27017/coderfairy'
const dbatlas = 'mongodb+srv://ayusudi:ayusudi@cluster0-acddn.mongodb.net/coderfairy?retryWrites=true&w=majority'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))


mongoose.connect(dbatlas, {
  useNewUrlParser : true , useUnifiedTopology: true , useFindAndModify :false
}, function(err){
  if(err) {
    console.log(err)
    console.log(`server isn't connect to mongodb`);
  }
  else {
    console.log('Connected!');
  }
})

app.use('/', index)

app.listen(PORT, function(){
  console.log(`Hello from port ${PORT}`);
})