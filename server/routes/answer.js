const express = require('express')
const authentication = require('../middlewares/authentication')
const answerController = require('../controllers/answer')
const router = express.Router()

router.use(authentication)
router.post('/', answerController.create)
router.patch('/:id/upvote', answerController.upvote)
router.patch('/:id/downvote', answerController.downvote)
router.delete('/:id', answerController.remove)
module.exports = router