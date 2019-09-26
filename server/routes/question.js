const router = require('express').Router()
const auth = require('../middlewares/authenticate');
const QuestionController = require('../controllers/question');


router.get('/find/:id', QuestionController.getAQuestion)
router.delete('/:id', auth, QuestionController.remove)
router.get('/all', QuestionController.getAllQuestions)
router.patch('/edit/:id', auth, QuestionController.update)
router.patch('/downvote/:id', auth, QuestionController.downvote)
router.post('/', auth, QuestionController.register)
router.get('/', auth, QuestionController.getQuestions)
router.patch('/upvote/:id', auth, QuestionController.upvote)


module.exports = router