if(!process.env.NODE_ENV || process.env.NODE_ENV == 'development'){
    require('dotenv').config()
}

const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000; 
const routes = require('./routes')
const bodyParser = require('body-parser')
const { errorHandling } = require('./middleware/errorHandling')
const email = require('./helper/email')

// email()


app.use(express.json())
mongoose.connect('mongodb://localhost:27017/tes-overflow', {useNewUrlParser: true},()=>{
})
mongoose.connect(`mongodb://${process.env.USERNAME123}:${process.env.PASSWORD}@cluster0-shard-00-00-s62ed.mongodb.net:27017,cluster0-shard-00-01-s62ed.mongodb.net:27017,cluster0-shard-00-02-s62ed.mongodb.net:27017/hacktiv-overflow-2?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`, {useNewUrlParser: true},()=>{
})
.then(data=>{
    console.log('mongodb is connected');
})
.catch(err=>{
    console.log(err)
})

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ useNewUrlParser: true }))
app.use(morgan('dev'))
app.use(cors()) 

app.get('/',(req,res,next)=>{
    res.send('HOME OF API')
})
app.use('/' , routes)

app.use(errorHandling)

app.listen(port,()=>{
    console.log('listening to port ',port);
})