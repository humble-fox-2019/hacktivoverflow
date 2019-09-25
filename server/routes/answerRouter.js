const router = require('express').Router();
const AnswerController = require('../controllers/answerController')
const authentication = require('../middlewares/authentication')
const {answerAuth} = require('../middlewares/authorization')

router.get('/:id', AnswerController.getOneAnswer)
router.post('/:id', authentication , AnswerController.create)
router.put('/like/:id', authentication, AnswerController.likeAnswer)
router.put('/dislike/:id', authentication, AnswerController.dislikeAnswer)
router.put('/normalize/:id', authentication, AnswerController.normalizeOpinion)
router.put('/:id', authentication, answerAuth, AnswerController.updatePut)
router.delete('/:id', authentication, answerAuth, AnswerController.delete)

module.exports = router