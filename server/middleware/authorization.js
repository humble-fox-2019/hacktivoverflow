const Thread = require('../models/Thread')

module.exports = (req, res, next) => {
    const ThreadId = req.params.ThreadId
    const Id = req.decode.Id
    Thread.findById(ThreadId)
        .then((Thread) => {
            if (Thread) {
                if (Thread.owner == Id) {
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