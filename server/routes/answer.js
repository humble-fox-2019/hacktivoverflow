const router = require('express').Router()
const auth = require('../middlewares/authenticate');
const AnswerController = require('../controllers/answer');
const authorizeAnswer = require('../middlewares/authorizeAnswer');

router.delete('/:id', auth, authorizeAnswer, AnswerController.remove)
router.get('/:questionId', AnswerController.getAllAnswer)
router.post('/:questionId', auth, AnswerController.register)
router.patch('/desc/:id', auth, authorizeAnswer,AnswerController.updateDescription)
router.patch('/upvote/:id', auth, AnswerController.upvote)
router.patch('/downvote/:id', auth, AnswerController.downvote)



module.exports = router