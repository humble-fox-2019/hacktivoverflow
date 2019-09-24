const Question = require('../models/question')
const Answer = require('../models/answer')

function questionAuth(req, res, next){
  Question.findById(req.params.id)
  .then(isFound =>{
      if (isFound.userId === req.decoded._id){
        next()
      }
      else {
        next({
          status : 401,
          message : 'Unathorized'
        })
      }
  })
  .catch(() =>{
    next({
      status: 404,
      message: 'Not Found'
    })
  })
}


function answerAuth(req, res, next){
    Answer.findById(req.params.id)
    .then(isFound =>{
        if (isFound.userId === req.decoded._id){
          next()
        }
        else {
          next({
            status : 401,
            message : 'Unathorized'
          })
        }
    })
    .catch(() =>{
      next({
        status: 404,
        message: 'Not Found'
      })
    })
  }

module.exports = {questionAuth, answerAuth}