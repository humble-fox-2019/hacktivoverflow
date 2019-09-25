const router = require('express').Router()
const userRouter = require('./user')

router.get('/',(req, res, next) => {
  res.status(200).json({
    message: 'Connected cuuiyy'
  })
})
router.use('/users', userRouter)

module.exports = router
