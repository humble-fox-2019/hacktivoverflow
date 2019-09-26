const express = require('express');
const authentication = require('../middleware/authentication')
const { questionAuth } = require('../middleware/authorization')
const router = express.Router();

const QuestionController = require('../controllers/question')
router.get('/' , QuestionController.getAll );
router.get('/detail/:id' , QuestionController.getOneById );

router.use ( authentication )

// Harus login
router.post('/', QuestionController.create );
router.get('/user' , QuestionController.getByUser );

// harus yang punya doang
router.put('/:id' , questionAuth , QuestionController.updateById );
router.delete('/:id', questionAuth, QuestionController.deleteById );

// Siapapun bisa yang penting login
router.patch('/:id/up' , QuestionController.upVote );
router.patch('/:id/down' , QuestionController.downVote );

module.exports = router