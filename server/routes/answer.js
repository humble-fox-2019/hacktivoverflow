const router = require('express').Router()
const answerController = require('../controllers/answer')
const authentication = require('../middleware/userAuthentication')
const validasiIdAnswer = require('../middleware/validasiIdAnswer')

router.put('/vote/:id/:vote', authentication, validasiIdAnswer, answerController.vote)


module.exports = router
