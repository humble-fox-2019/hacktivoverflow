const express = require('express');
const QuestionController = require('../controllers/questionController');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const questionCheck = require('../middlewares/questionCheck');

router.get('/', QuestionController.findAll);
router.get('/:id', QuestionController.findOne);

router.use(authentication);
router.put('/upvote/:id', QuestionController.upVote);
router.put('/downvote/:id', QuestionController.downVote);
router.put('/removevote/:id', QuestionController.removeVote);

router.post('/', QuestionController.store);

router.use("/:id", questionCheck);
router.patch('/:id', QuestionController.update);
router.delete('/:id', QuestionController.delete);


module.exports = router;
