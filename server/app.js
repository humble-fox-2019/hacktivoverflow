require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3000

mongoose.connect(`mongodb://localhost/riverOverFlow`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))


const userRoutes = require('./routes/user')
const questionRoutes = require('./routes/question')
const answerRoutes = require('./routes/answer')



app.use('/user', userRoutes)
app.use('/question', questionRoutes)
app.use('/answer', answerRoutes)





app.listen(port, () => {
    console.log(`Listening Live and Well At ${port}`)
})

// const routes = require('./routes/index-route')

// app.use('/', routes)

// app.use(errorHandler)

// app.listen(port, () => console.log(`Example app listening on port port`))