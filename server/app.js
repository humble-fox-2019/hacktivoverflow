if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const PORT = process.env.PORT || 3000

// mongoose.connect('mongodb://localhost:27017/hacktiv-overflow-test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
mongoose.connect(process.env.ATLAS_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(_ => {
    console.log('Database: connected')
  })
  .catch(_ => {
    console.log('Database: failed to connect')
  })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => console.log(`listening on ${PORT}`))