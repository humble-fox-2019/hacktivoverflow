const Answer = require("../models/answer");

function answerCheck(req, res, next) {
    try {

        Answer.findOne({
            _id: req.params.id,
            userId: req.decode.id
        }).then(answer => {
            if (answer) {
                next()
            } else {
                next({ statusCode: 401, msg: "You do not have access to data answer" })
            }
        })
            .catch(next)
    }
    catch{
        next({ statusCode: 401, msg: "You do not have access to data answer" })
    }
}

module.exports = answerCheck
