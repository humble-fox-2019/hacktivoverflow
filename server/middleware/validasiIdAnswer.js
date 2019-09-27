const Answer = require('../models/Answer')

function validasi(req, res, next) {

  Answer.findById(req.params.id)
    .then(answer => {
      if(answer) {
        next()
      }else {
        next({
          status: 404,
          message: `Answer with id : ${req.params.id} not found`
        })
      }
    })
    .catch(next)

}


module.exports = validasi
