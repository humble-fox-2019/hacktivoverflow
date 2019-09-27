const answerModel = require('../model/answer')
const questionModel = require('../model/question')
const userModel = require('../model/user')


class QuestionController {


    static create(req, res, next) {

        console.log(req.body, '<<< ISIN BODYNYAAA')
        let obj = {
            title: req.body.title,
            content: req.body.content,
            userId: req.payload.id
        }
        console.log(obj, '<<< DARI CREATE LIAT ISINYA')
        questionModel.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err, '<< ERROR ADA DI CREATE QUESTION SERVER')
            })
    }

    static findAll(req, res, next) {
        questionModel.find()
            .populate('answers')
            .populate('userId')
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err, '<< ERRORNYA ADA DI FIND ALL QUESTION SERVER')
            })
    }

    static findOnebyId(req, res, next) {
        console.log(req.params.id, '< ini  req params idnya')
        questionModel.findById(req.params.id)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err, '<<< INI ERRNYA')
            })
    }

    static updateQuestion(req, res, next) {
        let update = {}
        req.body.title && (update.title = req.body.title)
        req.body.content && (update.content = req.body.content)

        questionModel.updateOne({
                _id: req.params.questionId
            }, {
                $set: update
            })
            .then(data => {
                res.status(200).json('sucessfully update question')
            })
            .catch(next)
    }

    static deleteQuestion(req, res, next) {
        questionModel.deleteOne({
                _id: req.params.questionId
            })
            .then(data => {
                return answerModel.deleteMany({
                    questionId: req.params.questionId
                })
            })
            .then(data => {
                return userModel.updateMany({}, {
                    $pull: {
                        upVotedQuestion: req.params.questionId,
                        downVotedQuestion: req.params.questionId
                    }
                })
            })
            .then(data => {
                res.status(200).json('Successfuly delete question')
            })
            .catch(next)
    }

    static upVote(req, res, next) {
        userModel.findById(req.payload.id)
            .then(data => {
                let upVotedQuestions = data.upVotedQuestion
                let check = upVotedQuestions.find(questionId => questionId == req.params.questionId)
                if (check) {
                    return Promise.all([
                        userModel.findOneAndUpdate({
                            _id: req.payload.id
                        }, {
                            $pull: {
                                upVotedQuestion: req.params.questionId
                            }
                        }),
                        questionModel.updateOne({
                            _id: req.params.questionId
                        }, {
                            $pull: {
                                upVotes: req.payload.id
                            }
                        })
                    ])
                } else {
                    return Promise.all([
                        userModel.findOneAndUpdate({
                            _id: req.payload.id
                        }, {
                            $push: {
                                upVotedQuestion: req.params.questionId
                            },
                            $pull: {
                                downVotedQuestion: req.params.questionId
                            }
                        }),
                        questionModel.updateOne({
                            _id: req.params.questionId
                        }, {
                            $push: {
                                upVotes: req.payload.id
                            },
                            $pull: {
                                downVotes: req.payload.id
                            }
                        })

                    ])
                }
            })
            .then(([data]) => {
                res.status(200).json('Successfully upVoted')
            })
            .catct(next)
    }

    static downVote(req, res, next) {
        userModel.findById(req.payload.id)
            .then(user => {
                let downVotedQuestions = user.downVotedQuestion
                let check = downVotedQuestions.find(questionId => questionId == req.params.questionId)
                if (check) {
                    return Promise.all([
                        userModel.findOneAndUpdate({
                            _id: req.payload.id
                        }, {
                            $pull: {
                                downVotedQuestion: req.params.questionId
                            }
                        }),

                        questionModel.updateOne({
                            _id: req.params.questionId
                        }, {
                            $pull: {
                                downVotes: req.payload.id
                            }
                        })
                    ])
                } else {
                    return Promise.all([
                        userModel.findOneAndUpdate({
                            _id: req.payload.id
                        }, {
                            $push: {
                                downVotedQuestion: req.params.questionId
                            },
                            $pull: {
                                upVotedQuestion: req.params.questionId
                            }
                        }),
                        questionModel.updateOne({
                            _id: req.params.questionId
                        }, {
                            $push: {
                                downVotes: req.payload.id
                            },
                            $pull: {
                                upVotes: req.payload.id
                            }
                        })
                    ])
                }
            })
            .then(([oldUser]) => {
                res.status(200).json('successfully downvoted')
            })
            .catch(next)
    }
}

module.exports = QuestionController