const Thread = require('../models/Thread')

module.exports = (req, res, next) => {
    let id = req.params.id
    if (req.params.replyId) id = req.params.replyId
    const userId = req.decode.id
    Thread.findById(id)
        .then((Thread) => {
            if (Thread) {
                if (Thread.owner == userId) {
                    next()
                } else {
                    let err = new Error('You have no authorization on this Thread')
                    err.name = 'AuthorizationError'
                    next(err)
                }
            } else {
                let err = new Error('Thread does not exist')
                err.name = 'NotFound'
                next(err)
            }
        }).catch(next);
}