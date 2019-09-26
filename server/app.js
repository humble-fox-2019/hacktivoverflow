if ( process.env.NODE_ENV ) 
    require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const userRouter = require('./routes/user')
const questionRouter  = require('./routes/question')
const answerRouter = require('./routes/answer')

const app = express();

app.use( cors() )
app.use( express.urlencoded({ extended: true }))
app.use( express.json() )

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect( DATABASE_URL , { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true , useFindAndModify: false })
.then ( _ => { console.log(`Database connected on : ` + DATABASE_URL ) })
.catch ( err => { console.log( "Database failed to connect"); console.log( err )})


app.use('/', userRouter )
app.use('/questions', questionRouter )
app.use('/answers' , answerRouter )

app.use( errorHandler )

const PORT = process.env.PORT || 3000 
app.listen( PORT , console.log("App listning on port : " + PORT ) )