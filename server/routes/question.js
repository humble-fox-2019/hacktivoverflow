const router = require('express').Router()
const questionController = require('../controllers/question')
const authentication = require('../middleware/userAuthentication.js')
const questionAuthorization = require('../middleware/questionAuthorization')
const validasiIdQuestion = require('../middleware/validasiIdQuestion')

router.get('/', questionController.getAll)
router.get('/search', questionController.search)
router.get('/tag/:tag', questionController.getByTag)
router.post('/', authentication, questionController.create)
router.post('/:id/comment', authentication, validasiIdQuestion, questionController.createComment)
router.post('/:id/answer', authentication, validasiIdQuestion, questionController.createAnswer)
router.get('/:id', validasiIdQuestion, questionController.getDetail)
router.delete('/:id', authentication, questionAuthorization, questionController.remove)
router.put('/vote/:id/:vote', authentication, validasiIdQuestion, questionController.vote)
router.put('/:id', authentication, questionAuthorization, questionController.update)

module.exports = router
