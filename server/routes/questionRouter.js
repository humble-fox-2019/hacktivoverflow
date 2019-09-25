const router = require('express').Router();
const authentication = require('../middlewares/authentication')
const QuestionController = require('../controllers/questionController')
const {questionAuth} = require('../middlewares/authorization')

router.get('/', QuestionController.getAll)
router.get('/:id', QuestionController.getOne)
router.get('/owned', authentication, QuestionController.userQuestion)
router.post('/create', authentication, QuestionController.create)
router.put('/like/:id', authentication, QuestionController.likeQuestion)
router.put('/dislike/:id', authentication, QuestionController.dislikeQuestion)
router.put('/normalize/:id', authentication, QuestionController.normalizeOpinion)
router.put('/:id', authentication, questionAuth, QuestionController.updatePut)
router.delete('/:id', authentication, questionAuth, QuestionController.delete)

module.exports = router