const Answer = require('../models/answer');
const Question = require('../models/question')

class answerController {

    static create(req, res, next) {
        let author = req.decode.id
        let questionId = req.body.questionId
        let description = req.body.description
        Question.findById(questionId)
            .then((found) => {
                if (found === null) {
                    res.status(404).json({
                        message: "There is no question like that"
                    })
                } else {
                    return Answer.create({
                        author,
                        questionId,
                        description
                    })
                        .then((newData) => {
                            return Question.findOneAndUpdate({
                                _id: newData.questionId
                            }, {
                                $addToSet: {
                                    answer: newData
                                }
                            }, {
                                new: true, runValidators: true
                            })
                        })
                        .then((updated) => {
                            res.status(200).json(updated)
                        })
                }
            }).catch(next)
    }

    static delete(req, res, next) {
        Answer.findByIdAndDelete(req.params.id)
            .then((deleted) => {
                return Question.findOneAndUpdate({
                    answer: req.params.id
                }, {
                    $pull: {
                        answer: req.params.id
                    }
                })
                    .then((deleteAnswer) => {
                        res.status(200).json(deleted)
                    })
            })
            .catch(next)
    }

    static edit(req, res, next) {
        let updatedData = {}
        updatedData.updatedAt = new Date()
        req.body.answer && (updatedData.answer = req.body.answer)
        Answer.findOneAndUpdate({ _id: req.params.id }, updatedData)
            .then((data) => {
                if (data !== null) {
                    res.status(200).json({
                        message: "Success Update"
                    })
                } else {
                    res.status(404).json({
                        message: "Data is not found"
                    })
                }
            }).catch(next)
    }

    static upvote(req, res, next) {
        let UserId = req.decode.id
        let {
            id
        } = req.params
        Answer.findOne({
            _id: id,
            upvotes: UserId
        })
            .then(data => {
                if (data) {
                    throw {
                        httpStatus: 500,
                        message: "You can't Upvote Again"
                    }
                } else {
                    return Answer.findOne({
                        _id: id,
                        downvotes: UserId
                    })
                }
            })
            .then(response => {
                if (response) {
                    return Answer.findByIdAndUpdate(id, {
                        $pull: {
                            downvotes: UserId
                        }
                    }, {
                        new: true
                    })
                } else {
                    return Answer.findByIdAndUpdate(id, {
                        $push: {
                            upvotes: UserId
                        }
                    }, {
                        new: true
                    })
                }
            })
            .then(results => {
                res.status(200).json(results)
            })
            .catch(next)

    }


    static downvote(req, res, next) {
        console.log("masuk downvote answer")
        let UserId = req.decode.id
        let {
            id
        } = req.params
        Answer.findOne({
            _id: id,
            downvotes: UserId
        })
            .then(data => {
                if (data) {
                    throw {
                        httpStatus: 500,
                        message: "You can't Downvote again"
                    }
                } else {
                    return Answer.findOne({
                        _id: id,
                        upvotes: UserId
                    })
                }
            })
            .then(response => {
                if (response) {
                    return Answer.findByIdAndUpdate(id, {
                        $pull: {
                            upvotes: UserId
                        }
                    }, {
                        new: true
                    })
                } else {
                    return Answer.findByIdAndUpdate(id, {
                        $push: {
                            downvotes: UserId
                        }
                    }, {
                        new: true
                    })
                }
            })
            .then(results => {
                res.status(200).json(results)
            })
            .catch(next)

    }

}

module.exports = answerController
