const { Answer } = require('../models')

module.exports = (req, res, next) => {
  const { id } = req.params
  Answer.findById(id)
    .then(answer => {
      if (answer) {
        if (answer.userId == req.decode.userId) {
          next()
        } else {
          next({ status: 400, message: 'Unauthorized' })
        }
      } else next({ status: 400, message: 'Unauthorized' })
    })
}