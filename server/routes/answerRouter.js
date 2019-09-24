const router = require('express').Router();
const AnswerController = require('../controllers/answerController')
const authentication = require('../middlewares/authentication')
const {answerAuth} = require('../middlewares/authorization')

router.post('/:id', authentication , AnswerController.create)
router.put('/:id', authentication, answerAuth, AnswerController.updatePut)
router.delete('/:id', authentication, answerAuth, AnswerController.delete)

module.exports = router