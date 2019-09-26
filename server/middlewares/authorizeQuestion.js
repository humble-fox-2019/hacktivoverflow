const Question = require('../models/question');
module.exports = (req, res, next) => {
    Question.findOne({
        _id: req.params.id
    })
    .then(question => {
        if(question.user == req.decode.id)next()
        else{
            next({ status: 403, message: "You don't have the authority to do this action" })
        }
    })
}