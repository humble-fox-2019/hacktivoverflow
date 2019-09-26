const router = require('express').Router()
const userRoutes = require('./user')
const questionRoutes = require('./question')
const answerRoutes = require('./answer')
const authentication = require('../middlewares/authentication')

router.use('/users', userRoutes)

router.use(authentication)
router.use('/questions', questionRoutes)
router.use('/answers', answerRoutes)

module.exports = router