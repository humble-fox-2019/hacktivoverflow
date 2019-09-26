const express = require('express');
const router = express.Router();
const {Authenthication} = require('../middleware')
const {vote_controller} = require('../controller')
router.use(Authenthication)

router.put('/:id/question/upvote' ,  vote_controller.upVotesQuestion)
router.put('/:id/question/downvote' ,  vote_controller.downVotesQuestion)
router.put('/:id/answer/upvote' ,  vote_controller.upVoteAnswer)
router.put('/:id/answer/downvote' ,  vote_controller.downVotesAnswer)
router.put('/:id'  , vote_controller.upVote )
router.put('/:id/answer' ,  vote_controller.voteAnswer)
router.get('/' ,  vote_controller.getMostVoters)


module.exports = router
