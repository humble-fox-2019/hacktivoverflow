const express = require('express')
const questController = require('../controllers/question')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.get('/', questController.realAll)
router.get('/:id', questController.findById)
router.use(authentication)
router.post('/', questController.create)
router.patch('/:id/upvote', questController.upvote)
router.patch('/:id/downvote', questController.downvote)
router.delete('/:id', questController.remove)
module.exports = router