
const Router = require('express').Router(),
    ThreadController = require('../controllers/Thread'),
    authentication = require('../middleware/authentication'),
    authorization = require('../middleware/authorization')

Router.get('/:id', ThreadController.readThread)
Router.get('/', ThreadController.read)

Router.use(authentication)
Router.post('/', ThreadController.createThread)
Router.post('/reply/:id', ThreadController.replyThread)

// * Votes
Router.put('/upvote/:id', ThreadController.upvote)
Router.put('/downvote/:id', ThreadController.downvote)
Router.put('/removevote/:id', ThreadController.removeVote)

// * Original Poster
Router.put('/update/:id', authorization, ThreadController.update)
Router.delete('/delete/:id', authorization, ThreadController.delete)

// * Replies
Router.put('/reply/:replyId', authorization, ThreadController.updateReply)
Router.delete('/reply/:id/:replyId', authorization, ThreadController.deleteReply)



module.exports = Router;
