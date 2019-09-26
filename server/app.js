if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
require('./config/mongoose')
const express = require('express')
const CronJob = require('cron').CronJob
const routes = require('./routes')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('./middleware/errorHandler')
const app = express()
const PopularTagController = require('./controllers/popularTag')


new CronJob('0 0 0 * * *', function() {
  PopularTagController.create()
}, null, true, 'Asia/Jakarta')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

app.use(errorHandler)


module.exports = app

