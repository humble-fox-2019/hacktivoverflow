const { verifyToken } = require('../helpers/jwt');
const Question = require('../models/question');
const Answer = require('../models/answer');

module.exports = {
    Authentication: (req, res, next) => {
        if (req.headers.token) {
            try {
                let decode = verifyToken(req.headers.token);
                req.decode = decode;
                next();
            }
            catch{
                next({ status: 401, message: "invalid token" });
            }
        }
        else {
            next({ status: 401, message: "please login first" });
        }
    }
    , AuthorizationQuestion: (req, res, next) => {
        const _id = req.params.id;
        const userId = req.decode._id;
        Question.findById({
            _id
        })
            .then(function (question) {
                if (question.userId == userId) {
                    next()
                } else {
                    next({ status: 403, message: "Unauthorized action!" });
                }
            })
            .catch(next);
    }
    , AuthorizationAnswer: (req, res, next) => {
        const _id = req.params.id;
        const userId = req.decode._id;
        Answer.findById({
            _id
        })
            .then(function (answer) {
                if (answer.userId == userId) {
                    next()
                } else {
                    next({ status: 403, message: "Unauthorized action!" });
                }
            })
            .catch(next);
    }
};