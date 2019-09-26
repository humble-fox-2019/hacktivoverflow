const express = require('express');
const router = express.Router()

const authentication = require('../middleware/authentication');
const { answerAuth,answerQuestionAuth } = require('../middleware/authorization' )
const AnswerController = require('../controllers/answer');

router.get('/' , AnswerController.getAll )
router.get('/detail/:id', AnswerController.getById)

// harus login
router.use( authentication );

// Check if the question is there or not?
router.post( '/' , answerQuestionAuth, AnswerController.create )

// Harus pemilik baru bisa Update/Delete AnswerID
router.delete('/:id' , answerAuth , AnswerController.deleteById );
router.put('/:id', answerAuth , AnswerController.updateById );

// yang penting login
router.patch('/:id/up', AnswerController.upVote )
router.patch('/:id/down', AnswerController.downVote )
module.exports = router