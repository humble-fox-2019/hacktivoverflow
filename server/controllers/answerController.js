const Answer = require('../models/answer');
const Question = require('../models/question');

class AnswerController {
    static findAll(req, res, next) {
        Answer.find()
            .then(answers => {
                res.status(200).json(answers);
            }).catch(next);
    }

    static findOne(req, res, next) {
        Answer.findOne({
            _id: req.params.id
        }).then(answer => {
            res.status(200).json(answer);
        }).catch(next);
    }

    static store(req, res, next) {
        const { content, questionId } = req.body
        let answerData;
        Answer
            .create({
                content: content,
                questionId: questionId,
                userId: req.decode.id,
            })
            .then(data => {
                return data.populate('userId', 'name email').execPopulate()
            })
            .then(data => {
                answerData = data;
                return Question
                    .findOneAndUpdate({ _id: questionId }, {
                        $push: { answers: answerData._id }
                    })
            })
            .then(data => {
                res.status(201).json(answerData);
            })
            .catch(next);
    }

    static update(req, res, next) {
        Answer
            .findByIdAndUpdate(req.params.id, {
                content: req.body.content,
            }, { new: true })
            .populate('questionId')
            .populate('userId', 'name email')
            .then(data => {
                if (!data) next({ statusCode: 404, msg: 'Answer not found' })
                res.json(data);
            })
            .catch(next)
    }

    static delete(req, res, next) {
        let answerData;
        Answer
            .deleteOne({ _id: req.params.id })
            .then(data => {
                answerData = data;
                return Question
                    .findByIdAndUpdate(req.params.questionId, {
                        $pull: { answers: req.params.id }
                    })
            })
            .then(data => {
                if (answerData.deletedCount === 0) next({ statusCode: 404, msg: 'Answer not found' })
                res.json({
                    message: 'Successfully delete answer',
                })
            })
            .catch(next);
    }

    static upVote(req, res, next) {
        Answer
            .findByIdAndUpdate(req.params.id, {
                $pull: { downvotes: req.decode.id }
            })
            .then(data => {
                return Answer
                    .findOne({
                        upvotes: req.decode.id
                    })
            })
            .then(data => {
                if (data) return data
                return Answer
                    .findByIdAndUpdate(req.params.id, {
                        $push: { upvotes: req.decode.id }
                    })
            })
            .then(data => {
                if (!data) next({ statusCode: 404, msg: 'Answer not found' })
                res.json({ message: 'Upvote Success!' });
            })
            .catch(next);
    }

    static downVote(req, res, next) {
        Answer
            .findByIdAndUpdate(req.params.id, {
                $pull: { upvotes: req.decode.id }
            })
            .then(data => {
                return Answer
                    .findOne({
                        downvotes: req.decode.id
                    })
            })
            .then(data => {
                if (data) return data
                return Answer
                    .findByIdAndUpdate(req.params.id, {
                        $push: { downvotes: req.decode.id }
                    })
            })
            .then(data => {
                if (!data) next({ statusCode: 404, msg: 'Answer not found' })
                res.json({ message: 'Downvote Success!' });
            })
            .catch(next);
    }

    static removeVote(req, res, next) {
        Answer
            .findByIdAndUpdate(req.params.id, {
                $pull: { upvotes: req.decode.id }
            })
            .then(data => {
                return Answer
                    .findByIdAndUpdate(req.params.id, {
                        $pull: { downvotes: req.decode.id }
                    })
            })
            .then(data => {
                if (!data) next({ statusCode: 404, msg: 'Answer not found' })
                res.json({ message: 'Remove vote Success!' });
            })
            .catch(next);

    }
}

module.exports = AnswerController
