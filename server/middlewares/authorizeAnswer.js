const Answer = require('../models/answer');

module.exports = (req, res, next) => {
    Answer.findOne({
        user: req.params.id
    })
    .then(answer => {
        if(answer.user == req.decode.id)next()
        else {
            next({ status: 403, message: "You don't have the authority to do this action" })
        }
    })
    
}