const Answer = require('../models/Answer')



class answerController {

  static vote(req, res, next) {
    Answer.findById(req.params.id, 'upvote downvote')
      .then(answer => {

        let isUpvote = false
        for(let i=0;i<answer.upvote.length;i++) {
          if(answer.upvote[i] == req.decode.id) {
            isUpvote = true
          }
        }

        let isDownvote = false
        for(let i=0;i<answer.downvote.length;i++) {
          if(answer.downvote[i] == req.decode.id) {
            isDownvote = true
          }
        }

        let vote = req.params.vote

        if(vote === 'up') {

          if(isUpvote) {
            //mengahapus upvote
            return Answer.findByIdAndUpdate(req.params.id, {
              $pull : {
                upvote: req.decode.id
              }
            }, {
              new: true,
              useFindAndModify: false
            })
            .populate('owner', 'username email')
          }else {
            //menambah upvote
            return Answer.findByIdAndUpdate(req.params.id, {
              $push : {
                upvote: req.decode.id
              },
              $pull : {
                downvote: req.decode.id
              }
            }, {
              new: true,
              useFindAndModify: false
            })
            .populate('owner', 'username email')
          }

        }else if(vote === 'down') {
          if(isDownvote) {
            //menghapus downvote
            return Answer.findByIdAndUpdate(req.params.id, {
              $pull : {
                downvote: req.decode.id
              }
            }, {
              new: true,
              useFindAndModify: false
            })
            .populate('owner', 'username email')
          }else {
            //menambah downvote
            return Answer.findByIdAndUpdate(req.params.id, {
              $push : {
                downvote: req.decode.id
              },
              $pull : {
                upvote: req.decode.id
              }
            }, {
              new: true,
              useFindAndModify: false
            })
            .populate('owner', 'username email')
          }
        }else {
          return new Promise((resolve, reject) => {
            reject({
              status: 400,
              message: 'Bad request'
            })
          })
        }


      })
      .then(answer => {
        res.json({ answer })
      })
      .catch(next)
  }

}


module.exports = answerController



