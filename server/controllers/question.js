const Question = require('../models/question')
class questionController {
    static realAll(req, res, next) {
        Question.find().populate('Answer')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)
    }

    static create(req, res, next) {
        const { title, description } = req.body
        Question.create({
            title,
            description,
            userId: req.decode.id
        })
            .then(question => {
                res.status(201).json(question)
            })
            .catch(next)

    }

    static upvote(req, res, next) {
        let questionData = null
        Question.findById(req.params.id)
            .then(question => {
                questionData = question
                return Question.updateOne({ _id: question._id },
                    { $pull: { downvote: req.decode.id } }, { multy: true }
                )
            })
            .then(() => {
                let upvote = questionData.upvote
                upvote.forEach(el => {
                    if (el == req.decode.id) {
                        throw ({
                            status: 400,
                            message: `You've Upvoted this question`
                        })
                    }
                })
                upvote.push(req.decode.id)
                return Question.updateOne(
                    { _id: req.params.id },
                    { upvote }
                )
            })
            .then(() => {
                res.status(201).json({ message: `Upvote Success` })
            })
            .catch(next)
    }

    static downvote(req, res, next) {
        let questionData = null
        Question.findById(req.params.id)
            .then(question => {
                questionData = question
                return Question.updateOne({ _id: question._id },
                    { $pull: { upvote: req.decode.id } }
                )
            })
            .then(() => {
                let downvote = questionData.downvote
                downvote.forEach(el => {
                    if (el == req.decode.id) {
                        throw ({
                            status: 400,
                            message: `You've downvoted this question`
                        })
                    }
                })
                downvote.push(req.decode.id)
                return Question.updateOne(
                    { _id: req.params.id },
                    { downvote }
                )
            })
            .then(() => {
                res.status(201).json({ message: `downvote Success` })
            })
            .catch(next)
    }

    static remove(req, res, next) {
        Question.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({
                    message: `Delete question Success`
                })
            })
            .catch(next)
    }
}

module.exports = questionController