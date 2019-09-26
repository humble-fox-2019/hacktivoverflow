const router = require('express').Router()
const answerRouter =  require('./answer');
const questionRouter =  require('./question');
const userRouter = require('./user');

router.get('/', function(req, res, next){
    res.status(200).json({
        message: 'connected'
    })
})
router.use('/users', userRouter)
router.use('/questions', questionRouter)
router.use('/answers', answerRouter)

module.exports = router