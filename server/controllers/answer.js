const Answer = require('../models/answer')
const Question = require('../models/question')

class answerController {
    static create(req, res, next) {
        const { title, description } = req.body
        Answer.create({
            description
        })
            .then(answer => {
                res.status(201).json(answer)
            })
            .catch(next)

    }

    static upvote(req, res, next) {
        let answerData = null
        Answer.findById(req.params.id)
            .then(answer => {
                answerData = answer
                return Answer.updateOne({ _id: answer._id },
                    { $pull: { downvote: req.decode.id } }, { multy: true }
                )
            })
            .then(() => {
                let upvote = answerData.upvote
                upvote.forEach(el => {
                    if (el == req.decode.id) {
                        throw ({
                            status: 400,
                            message: `You've Upvoted this answer`
                        })
                    }
                })
                upvote.push(req.decode.id)
                return Answer.updateOne(
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
        let answerData = null
        Answer.findById(req.params.id)
            .then(answer => {
                answerData = answer
                return Answer.updateOne({ _id: answer._id },
                    { $pull: { upvote: req.decode.id } }
                )
            })
            .then(() => {
                let downvote = answerData.downvote
                downvote.forEach(el => {
                    if (el == req.decode.id) {
                        throw ({
                            status: 400,
                            message: `You've downvoted this answer`
                        })
                    }
                })
                downvote.push(req.decode.id)
                return Answer.updateOne(
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
        Answer.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({
                    message: `Delete answer Success`
                })
            })
            .catch(next)
    }
}

module.exports = answerController