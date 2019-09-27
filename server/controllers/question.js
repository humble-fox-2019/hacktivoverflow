const Question = require('../models/question');
const Answer = require('../models/answer');

class QuestionController {

    static readAll(req, res, next) {
        Question.find({}, null, { sort: { createdAt: -1 } })
            .populate('userId')
            .then(questions => {
                res.status(200).json(questions);
            })
            .catch(next);
    }


    static deleteByVotes() {
        let found = [];
        Question.find({})
            .then(questions => {
                return questions.forEach(question => {
                    if (question.totalVotes < 0) {
                        found.push(question._id);
                    }
                })
            })
            .then(() => {
                return Question.deleteMany({
                    _id: { $in: found }
                })
            })
            .then(() => {
                console.log(`Success delete unlike questions`);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static readTag(req, res, next) {
        const tag = req.query.tag;
        Question.find({
            tags: tag
        })
            .then(questions => {
                res.status(200).json(questions);
            })
            .catch(next);
    }

    static readUsers(req, res, next) {
        const userId = req.decode._id;
        Question.find({
            userId
        }, null, { sort: { createdAt: -1 } })
            .populate('userId')
            .then(questions => {
                res.status(200).json(questions);
            })
            .catch(next);
    }

    static readOne(req, res, next) {
        const _id = req.params.id;
        Question.findById({
            _id
        })
            .populate('userId')
            .then(question => {
                res.status(200).json(question);
            })
            .catch(next);
    }

    static create(req, res, next) {
        const userId = req.decode._id;
        let { title, content, tags } = req.body;
        tags = tags.split(" ");
        Question.create({
            userId,
            title,
            content,
            tags,
        })
            .then(question => {
                res.status(201).json(question);
            })
            .catch(next);
    }

    static update(req, res, next) {
        const _id = req.params.id;
        let { title, content, tags } = req.body;
        tags = tags.split(' ');
        Question.findOneAndUpdate({
            _id
        }, {
            title,
            content,
            tags
        }, {
            new: true
        })
            .then(question => {
                res.status(200).json(question);
            })
            .catch(next);
    }

    static delete(req, res, next) {
        const _id = req.params.id;
        const questionId = req.params.id;
        Question.findOneAndDelete({
            _id
        })
            .then(() => {
                return Answer.deleteMany({
                    questionId
                })
            })
            .then(() => {
                res.status(200).json({
                    message: `Success delete question`
                });
            })
            .catch(next);
    }

    static vote(req, res, next) {
        const userId = req.decode._id;
        const _id = req.params.id;
        const { value } = req.body;
        let data = {};
        Question.findById({
            _id
        })
            .then((question) => {
                let canVote = true;
                const checkDown = question.downvote.filter((user) => {
                    if (user == userId) {
                        canVote = false;
                        return user;
                    }
                });
                const checkUp = question.upvote.filter((user) => {
                    if (user == userId) {
                        canVote = false
                        return user;
                    }
                });
                if (canVote) {
                    if (value == 0) {
                        Question.findByIdAndUpdate(
                            { _id },
                            { $push: { upvote: userId } }, {
                            new: true
                        }
                        )
                            .then(question => {
                                res.status(200).json(question);
                            })
                    } else if (value == 1) {
                        Question.findByIdAndUpdate(
                            { _id },
                            { $push: { downvote: userId } }, {
                            new: true
                        }
                        )
                            .then(question => {
                                res.status(200).json(question);
                            })
                    }
                } else {
                    if (checkUp.length === 1 && value == '1') {
                        Question.findByIdAndUpdate(
                            { _id },
                            { $pull: { upvote: userId } }, {
                            new: true
                        }
                        )
                            .then(question => {
                                res.status(200).json(question);
                            })
                    } else if (checkDown.length === 1 && value == '0') {
                        Question.findByIdAndUpdate(
                            { _id },
                            { $pull: { downvote: userId } }, {
                            new: true
                        }
                        )
                            .then(question => {
                                res.status(200).json(question);
                            })
                    } else {
                        res.status(200).json(question);
                    }
                }
            })
            .catch(next);
    }



}

module.exports = QuestionController;