const router = require('express').Router()
const userRoutes = require('./user')
const questionRoutes = require('./question')
const answerRoutes = require('./answer')
const popularTagController = require('../controllers/popularTag')

router.get('/', (req, res, next) => {
  res.json('Hello world')
})

router.get('/popular-tag', popularTagController.getAll)
router.use('/user', userRoutes)
router.use('/question', questionRoutes)
router.use('/answer', answerRoutes)

module.exports = router


