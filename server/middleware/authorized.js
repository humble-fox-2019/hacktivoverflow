const user = require('../model/user')
module.exports =
    function authorized(req, res, next) {
        console.log('masuk authorized')
        // console.log(req)
        console.log(req.params.id, '<<<<< ini idnya')
        // console.log(req., '<<<< INI PAYLOAD BRO')
        user.findById(req.params.id)
            .then(data => {
                if (data.userId == req.payload._id) {
                    console.log('lancar kok')
                    next()
                } else {
                    console.log('authorizednya error')
                    next({
                        code: 401,
                        message: 'UnAuthorized User'
                    })
                }

            })
            .catch(next)

    }