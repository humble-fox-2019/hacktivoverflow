const express = require('express')
const router = express.Router()
const answerRoute = require('./answer')
const questionRoute = require('./question')
const userRoute = require('./user')

router.use('/answers', answerRoute)
router.use('/questions', questionRoute)
router.use('/user', userRoute)

module.exports = router