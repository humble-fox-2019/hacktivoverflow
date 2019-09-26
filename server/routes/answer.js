const routes = require('express').Router()
const answer = require('../controllers/answer')
const { authorizationAnswer } = require('../middleware/authorization')
const authentication = require('../middleware/authentication')

routes.post('/', authentication, answer.create)
routes.patch('/:id', authentication, authorizationAnswer, answer.edit)
routes.delete('/:id', authentication, authorizationAnswer, answer.delete)
routes.patch('/upvote/:id', authentication, answer.upvote)
routes.patch('/downvote/:id', authentication, answer.downvote)
module.exports = routes