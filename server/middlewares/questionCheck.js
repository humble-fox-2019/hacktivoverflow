const Question = require("../models/question");

function questionCheck(req, res, next) {
    try {
        
        Question.findOne({
            _id: req.params.id,
            userId: req.decode.id
        }).then(question => {
                if (question) {
                    next()
                } else {
                    next({ statusCode: 401, msg: "You do not have access to data question" })
                }
            })
            .catch(next)
    }
    catch{
        next({ statusCode: 401, msg: "You do not have access to data question" })
    }
}

module.exports = questionCheck
