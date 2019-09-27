const Answer = require('../models/answer');
const Question = require('../models/question');

class AnswerController {

    static edit(req, res, next) {
        const _id = req.params.id;
        const { title, content } = req.body;
        Answer.findOneAndUpdate({
            _id
        }, {
                title,
                content
            }, {
                new: true
            })
            .then(answer => {
                res.status(200).json(answer);
            })
            .catch(next);
    }

    static readAnswer(req, res, next) {
        const questionId = req.params.id;
        Answer.find({
            questionId
        }, null, { sort: { createdAt: -1 } })
            .populate('userId')
            .then(answers => {
                res.status(200).json(answers);
            })
            .catch(next);
    }

    static readOne(req, res, next) {
        const _id = req.params.id;
        Answer.findById({
            _id
        })
            .then(answer => {
                res.status(200).json(answer);
            })
            .catch(next);
    }

    static create(req, res, next) {
        const userId = req.decode._id;
        const questionId = req.params.id;
        const { title, content } = req.body;
        Answer.create({
            title,
            content,
            userId,
            questionId
        })
            .then(answer => {
                res.status(201).json(answer);
            })
            .catch(next);
    }

    static delete(req, res, next) {
        const _id = req.params.id
        Answer.findOneAndDelete({
            _id
        })
            .then(() => {
                res.status(200).json({
                    message: `Success delete answer`
                });
            })
            .catch(next);
    }

    static vote(req, res, next) {
        const userId = req.decode._id;
        const _id = req.params.id;
        const { value } = req.body;
        let data = {};
        Answer.findById({
            _id
        })
            .then((answer) => {
                let canVote = true;
                const checkDown = answer.downvote.filter((user) => {
                    if (user == userId) {
                        canVote = false;
                        return user;
                    }
                });
                const checkUp = answer.upvote.filter((user) => {
                    if (user == userId) {
                        canVote = false
                        return user;
                    }
                });
                if (canVote) {
                    if (value == '0') {
                        Answer.findByIdAndUpdate(
                            { _id },
                            { $push: { upvote: userId } }, {
                                new: true
                            }
                        )
                            .then(answer => {
                                res.status(200).json(answer);
                            })
                    } else if (value == '1') {
                        Answer.findByIdAndUpdate(
                            { _id },
                            { $push: { downvote: userId } }, {
                                new: true
                            }
                        )
                            .then(answer => {
                                res.status(200).json(answer);
                            })
                    }
                } else {
                    if (checkUp.length === 1 && value == '1') {
                        Answer.findByIdAndUpdate(
                            { _id },
                            { $pull: { upvote: userId } }, {
                                new: true
                            }
                        )
                            .then(answer => {
                                res.status(200).json(answer);
                            })
                    } else if (checkDown.length === 1 && value == '0') {
                        Answer.findByIdAndUpdate(
                            { _id },
                            { $pull: { downvote: userId } }, {
                                new: true
                            }
                        )
                            .then(answer => {
                                res.status(200).json(answer);
                            })
                    } else {
                        res.status(200).json(answer);
                    }
                }
            })
            .catch(next);
    }

}

module.exports = AnswerController;