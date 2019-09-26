const routes = require('express').Router();
const question = require('../controllers/question');
const { authorizationQuestion } = require('../middleware/authorization');
const authentication = require('../middleware/authentication')

routes.get('/mine', authentication, question.getMyQuestion)
routes.get('/', authentication, question.getAll)
routes.get('/:id', authentication, question.getOne)
routes.post('/', authentication, question.create)
routes.patch('/:id', authentication, authorizationQuestion, question.edit)
routes.delete('/:id', authentication, authorizationQuestion, question.delete)
routes.patch('/upvote/:id', authentication, question.upvote)
routes.patch('/downvote/:id', authentication, question.downvote)

module.exports = routes