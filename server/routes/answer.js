const router = require('express').Router()
const { AnswerController } = require('../controllers')
const answerAuthorization = require('../middlewares/answerAuthorization')

// router.post('/', AnswerController.create)
router.patch('/:id/upvote', AnswerController.upvote)
router.patch('/:id/downvote', AnswerController.downvote)

router.use('/:id', answerAuthorization)
router.get('/:id', AnswerController.getOne)
router.patch('/:id', AnswerController.update)
router.delete('/:id', AnswerController.delete)

module.exports = router