const Question = require('../models/Question')


function validasi(req, res, next) {

  Question.findById(req.params.id)
    .then(question => {
      if(question) {
        next()
      }else{
        next({
          status: 404,
          message: 'Question not found'
        })
      }
    })
    .catch(next)
}


module.exports = validasi
