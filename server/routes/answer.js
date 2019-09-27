const router = require('express').Router()
const answerController = require('../controller/answer')
const {
    authentication
} = require('../middleware/authenticate')
const {
    authorized
} = require('../middleware/authorized')




router.use(authentication)
router.get('/', answerController.findAll)
router.post('/:id', answerController.create)
router.delete('/:questionId/:answerId', answerController.delete)

// edit answer
router.delete('/:answerId', answerController.updateAnswer)

module.exports = router