if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}
const express =  require('express');
const app = express()

const cors = require('cors');
app.use(cors())

const mongoose = require('mongoose');
mongoose.connect(process.env.ATLAS_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(_=>{
    console.log('connected to database');
})
.catch(console.log)

const PORT = process.env.PORT || 3000



app.use(express.json())
app.use(express.urlencoded({ extended: false }))   


const router =  require('./routes')
const errorHandler = require('./middlewares/errorHandler');
app.use('/', router)
app.use(errorHandler)


app.listen(PORT, function(){
    console.log('listening on port', PORT)
})



