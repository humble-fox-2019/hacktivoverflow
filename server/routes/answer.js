const router = require('express').Router()
const auth = require('../middlewares/authenticate');
const AnswerController = require('../controllers/answer');


router.delete('/:id', auth, AnswerController.remove)
router.get('/:questionId', AnswerController.getAllAnswer)
router.post('/:questionId', auth, AnswerController.register)
router.patch('/desc/:id', auth, AnswerController.updateDescription)
router.patch('/upvote/:id', auth, AnswerController.upvote)
router.patch('/downvote/:id', auth, AnswerController.downvote)



module.exports = router