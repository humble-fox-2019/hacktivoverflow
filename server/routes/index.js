const express = require('express')
const router = express.Router()
const question = require('../routes/question')
const user = require('../routes/user')
const answer = require('../routes/answer')
router.use('/user', user)
router.use('/question',question)
router.use('/answer',answer)

module.exports = router