const express = require('express');
const AnswerController = require('../controllers/answerController');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const answerCheck = require('../middlewares/answerCheck');

router.get('/', AnswerController.findAll);
router.get('/:id', AnswerController.findOne);

router.use(authentication);
router.put('/upvote/:id', AnswerController.upVote);
router.put('/downvote/:id', AnswerController.downVote);
router.put('/removevote/:id', AnswerController.removeVote);

router.post('/', AnswerController.store);

router.use("/:id", answerCheck);
router.patch('/:id', AnswerController.update);
router.delete('/:id', AnswerController.delete);

module.exports = router;
