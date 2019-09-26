const router = require('express').Router()
const userRoutes = require('./user')
const questionRoutes = require('./question')
const answerRoutes = require('./answer')

router.get('/', (req, res, next) => {
  res.json('Hello world')
})

router.use('/user', userRoutes)
router.use('/question', questionRoutes)
router.use('/answer', answerRoutes)

module.exports = router


