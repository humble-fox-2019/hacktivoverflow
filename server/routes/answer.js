const AnswerController = require('../controllers/answer')
const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
router.use(authentication)

router.get('/',AnswerController.read)
router.post('/:qId',AnswerController.create)
router.patch('/:id',AnswerController.update)
router.delete('/:id',AnswerController.delete)

module.exports = router