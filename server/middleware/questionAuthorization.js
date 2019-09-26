const Question = require('../models/Question')

function questionAuthorization(req, res, next) {

  Question.findById(req.params.id)
    .then(question => {
      if(question) {
        if(question.owner == req.decode.id) {
          next()
        }else {
          next({
            status: 401,
            message: `Not authorized action`
          })  
        }
      }else {
        next({
          status: 404,
          message: `Question with id ${req.params.id} not found !`
        })
      }
    })
    .catch(next)

}


module.exports = questionAuthorization


