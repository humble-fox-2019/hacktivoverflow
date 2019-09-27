const router = require('express').Router();
const user = require('../routes/userRouter')
const question = require('../routes/questionRouter')
const answer = require('../routes/answerRouter')

router.get('/', (req, res)=> {
   res.send('Coder Fairy')
})

router.use('/user', user)
router.use('/question', question)
router.use('/answer', answer)

module.exports = router