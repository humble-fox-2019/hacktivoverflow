
const Router = require('express').Router(),
    ThreadController = require('../controllers/Thread')

Router.post('/', ThreadController.create)
Router.get('/', ThreadController.read)
Router.put('/:id', ThreadController.update)
Router.delete('/:id', ThreadController.delete)

module.exports = Router;
