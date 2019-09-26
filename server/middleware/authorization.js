const Question = require('../models/question');
const Answer = require('../models/answer');

module.exports = {
    authorizationQuestion: (req, res, next) => {
        Question.findById(req.params.id)
        .then((found) => {
          if(found.author == req.decode.id ) {
            next()
          } else {
            next({httpStatus: 401, message: 'You are not Authorized!!'})
          }
        })
        .catch(next);
      },
      authorizationAnswer: (req, res, next) => {
        Answer.findById(req.params.id)
        .then((found) => {
          if(found.author == req.decode.id ) {
            next()
          } else {
            next({httpStatus: 401, message: 'You are not Authorized!!'})
          }
        })
        .catch(next);
      },
}



