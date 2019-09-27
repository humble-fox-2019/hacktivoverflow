const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')

function authentication(req, res, next) {
  // console.log('hereee');
  if (req.headers.token) {
    req.decoded = verifyToken(req.headers.token)
    User.findOne({ email: req.decoded.email })
      .then(isFound => {
        if (!isFound) {
          console.log('hereeeeeeeeeeeeeee');
          next({ status: 404, message: "Not Found" })
        } else {
          next()
        }
      })
      .catch(()=>{
        next({
          status : 500,
          message : 'Error Internal Server'
        })
      })
  } else {
    next({ status: 403, message: "Forbidden Page" })
  }
}

module.exports = authentication