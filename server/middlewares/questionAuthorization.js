const { Question } = require('../models')

module.exports = (req, res, next) => {
  const { id } = req.params
  Question.findById(id)
    .then(question => {
      if (question) {
        if (question.userId == req.decode.userId) {
          next()
        } else {
          next({ status: 400, message: 'Unauthorized' })
        }
      } else next({ status: 400, message: 'Unauthorized' })
    })
}