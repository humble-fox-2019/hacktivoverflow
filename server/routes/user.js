const routes = require('express').Router();
const user= require('../controllers/user');

routes.post('/signup', user.register)
routes.post('/signin', user.login)

module.exports = routes
