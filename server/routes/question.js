const router = require('express').Router()
const questionController = require('../controller/question')
const {
    authentication
} = require('../middleware/authenticate')
const {
    authorized
} = require('../middleware/authorized')

router.use(authentication)

router.post('/', questionController.create)
router.get('/', questionController.findAll)
router.get('/:id', questionController.findOnebyId)

router.put('/:questionId', questionController.updateQuestion)

// Delete
router.delete('/:questionId', questionController.deleteQuestion)

// upvotes and downvotes
router.post('/upvotes/:questionId', questionController.upVote)
router.post('/downvotes/:questionId', questionController.downVote)


module.exports = router