const Router = require('express').Router();
const Thread = require('./Thread'),
    users = require('./User')

// * Server Test
Router.get('/', (req, res) => {
    res.status(200).json({ message: "connected to server" })
})

// * Routes
Router.use('/threads', Thread)
Router.use('/users', users)

module.exports = Router;