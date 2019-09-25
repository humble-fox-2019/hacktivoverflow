const Question = require('../models/question');

class QuestionController {
    static findAll(req, res, next) {
        Question.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .then(questions => {
                res.status(200).json(questions);
            }).catch(next);
    }

    static findOne(req, res, next) {
        Question
            .findById(req.params.id)
            .populate({
                path: 'answers',
                model: 'Answer',
                options: {
                    sort: {
                        'createdAt': -1
                    }
                }
            })
            .populate('userId', 'name email')
            .then(data => {
                if (!data) next({ httpStatus: 404, message: 'Question not found' })
                else res.json(data);
            })
            .catch(next);
    }

    static store(req, res, next) {
        Question
            .create({
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags,
                userId: req.decode.id,
            })
            .then(data => {
                return data.populate('userId', 'name email').execPopulate()
            })
            .then(data => {
                res.status(201).json(data);
            })
            .catch(next)
    }

    static update(req, res, next) {
        Question
            .findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags,
            }, { new: true })
            .populate('userId', 'name email')
            .then(data => {
                if (!data) {
                    next({ statusCode: 404, msg: 'Question not found' })
                }
                else {
                    res.json(data);
                }
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Question
            .deleteOne({ _id: req.params.id })
            .then(data => {
                if (data.deletedCount === 0) {
                    next({ statusCode: 404, msg: 'Question not found' })
                } else {
                    res.json({
                        message: 'Successfully Delete Question',
                    })
                }
            })
            .catch(next);
    }

    static upVote(req, res, next) {
        Question
            .findByIdAndUpdate(req.params.id, {
                $pull: { downvotes: req.decode.id }
            })
            .then(data => {
                return Question
                    .findOne({
                        upvotes: req.decode.id
                    })
            })
            .then(data => {
                if (data) return data
                return Question
                    .findByIdAndUpdate(req.params.id, {
                        $push: { upvotes: req.decode.id }
                    })
            })
            .then(data => {
                if (!data) {
                    next({ statusCode: 404, msg: 'Question not found' })
                } else {
                    res.json({ message: 'Upvote success!' });
                }
            })
            .catch(next);
    }

    static downVote(req, res, next) {
        Question
            .findByIdAndUpdate(req.params.id, {
                $pull: { upvotes: req.decode.id }
            })
            .then(data => {
                return Question
                    .findOne({
                        downvotes: req.decode.id
                    })
            })
            .then(data => {
                if (data) return data
                return Question
                    .findByIdAndUpdate(req.params.id, {
                        $push: { downvotes: req.decode.id }
                    })
            })
            .then(data => {
                if (!data) {
                    next({ statusCode: 404, msg: 'Question not found' });
                } else {
                    res.json({ update: data.length, message: 'Downvote Success!' });
                }
            })
            .catch(next);
    }

    static removeVote(req, res, next) {
        Question
            .findByIdAndUpdate(req.params.id, {
                $pull: { upvotes: req.decode.id }
            })
            .then(data => {
                return Question
                    .findByIdAndUpdate(req.params.id, {
                        $pull: { downvotes: req.decode.id }
                    })
            })
            .then(data => {
                if (!data) {
                    next({ statusCode: 404, msg: 'Question not found' })
                } else {
                    res.json({ update: data.length, message: 'Remove vote Success!' });
                }
            })
    }
}

module.exports = QuestionController
