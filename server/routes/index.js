const express = require('express')
const userRouter = require('./user')
const questionRouter = require('./question')
const answerRouter = require('./answer')
const router = express.Router()

router.use('/users', userRouter)
router.use('/questions', questionRouter)
router.use('/answers', answerRouter)
module.exports = router