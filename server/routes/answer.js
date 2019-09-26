const router = require('express').Router()
const { AnswerController } = require('../controllers')
const answerAuthorization = require('../middlewares/answerAuthorization')

router.post('/', AnswerController.create)
router.patch('/:id/upvote', AnswerController.upvote)
router.patch('/:id/downvote', AnswerController.downvote)

router.use('/:id', answerAuthorization)
router.put('/:id', AnswerController.update)

module.exports = router