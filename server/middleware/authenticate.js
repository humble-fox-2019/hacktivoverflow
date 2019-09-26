const {
    verifyToken
} = require('../helper/jwt')

module.exports = {
    authentication(req, res, next) {
        console.log('masuk ke authenticate', req.payload)
        if (req.headers.token) {
            try {
                let payload = verifyToken(req.headers.token)
                console.log(payload, '<<< payload')
                req.payload = payload
                next()
            } catch (err) {
                next({
                    status: 401,
                    message: "invalid token",
                    err: err
                })
            }
        } else {
            next({
                status: 401,
                message: "please login first"
            })
        }
    }
}