const answerModel = require('../model/answer')
const questionModel = require('../model/question')

class AnswerController {

    static create(req, res, next) {

        let obj = {
            content: req.body.content,
            userId: req.payload.id,
            questionId: req.params.id,
            upVotes: 0,
            downVotes: 0
        }
        console.log(req.payload, '<<< LIAT PAYLOADNYA')
        console.log(req.body, '<<< LIAT bodynya')
        console.log(req.params.id, '<<< LIAT questionIdnya')

        console.log(obj, '<<< ini input objnya  >>>>>>')
        answerModel.create(obj)
            .then(data => {
                return Promise.all([data, questionModel.updateOne({
                    _id: data.questionId
                }, {
                    $push: {
                        answer: data.id
                    }
                })])
            })
            .then(([data1]) => {

                res.status(201).json(data1)
            })
            .catch(err => {
                console.log(err, '<< ERRORNYA DARI CREATE ANSWER CONTROLLER')
            })
    }

    static findAll(req, res, next) {
        answerModel.find({
                questionId: req.params.questionId
            })
            .populate('userId')
            .populate('questionId')
            .then(data => {
                console.log(data, '<< POPULATE FIND ALL')
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err, '<< ERRORNYA DARI FIND ')
            })
    }

    static updateAnswer(req, res, next) {
        answerModel.updateOne({
                _id: req.params.answerId
            })
            .then(data => {
                res.status(200).json('Success Update')
            })
            .catch(next)
    }

    static delete(req, res, next) {
        answerModel.deleteOne({
                _id: req.params.id
            })
            .then(data => {
                return questionModel.findOneAndUpdate({
                    _id: req.params.questionId
                }, {
                    $pull: {
                        answers: req.params.answerId
                    }
                })
            })
            .then(data1 => {
                res.status(200).json(data)
            })
            .catch(next)
    }


}


module.exports = AnswerController