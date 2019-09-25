if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

require('./config/mongoose')
const express = require('express')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes/index')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Runinng on PORT ${PORT}`)
})