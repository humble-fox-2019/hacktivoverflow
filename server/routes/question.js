const router = require('express').Router()
const { QuestionController } = require('../controllers')
const questionAuthorization = require('../middlewares/questionAuthorization')

router.post('/', QuestionController.create)
router.get('/', QuestionController.getAll)
router.get('/:id', QuestionController.getOne)
router.patch('/:id/upvote', QuestionController.upvote)
router.patch('/:id/downvote', QuestionController.downvote)
router.patch('/:id/add-answer', QuestionController.addAnswer)

router.use('/:id', questionAuthorization)
router.put('/:id', QuestionController.update)
router.delete('/:id', QuestionController.delete)

module.exports = router