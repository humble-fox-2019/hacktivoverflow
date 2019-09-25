const router = require('express').Router()
const QuestionController = require('../controllers/question')
const { authentication } = require('../middlewares/authentication')

router.use(authentication)
router.post('/', QuestionController.create)
router.get('/', QuestionController.findAll)
router.put('/:id', QuestionController.update)
router.delete('/:id', QuestionController.delete)
router.post('/:id/upvote', QuestionController.upvote)
router.post('/:id/downvote', QuestionController.downvote)

module.exports = router
