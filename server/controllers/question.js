const Question = require('../models/question');
const Answer = require('../models/answer');

class questionController {

    static create(req, res, next) {
        console.log("masuk controller question create")
        console.log(req.decode, "<<<<<<<<<<")
        let title = req.body.title
        let description = req.body.description
        let tags = req.body.tags
        let author = req.decode.id
        Question.create({
            title,
            description,
            author
        })
            .then((created) => {
                let id = created._id
            return Question.findByIdAndUpdate(id, {
                    $addToSet: {
                        tags: {
                            $each: tags
                        }
                    }
                }, {
                    new: true,
                    runValidators: true
                })
                .then(data => {
                    res.status(200).json({
                        data
                    })
                })
            })
            .catch(next)
    }

    static getAll(req, res, next) {
        Question.find()
            .populate({
                path: 'author',
                select: ['name', 'updatedAt']
            })
            .populate({
                path: 'answer',
                populate: [
                    {
                        path: 'author',
                        select: ['name', 'updatedAt']
                    }
                ]
            })
            .sort([['updatedAt', -1]])
            .then((found) => {
                res.status(200).json(found)
            })
            .catch(next)
    }

    static getMyQuestion(req, res, next) {
        Question.find({
            author: req.decode.id
        })
            // .populate({
            //     path: 'author',
            //     select: ['name', 'updatedAt']
            // })
            // .populate({
            //     path: 'answer',
            //     populate: [
            //         {
            //             path: 'author',
            //             select: ['name', 'updatedAt']
            //         }
            //     ]
            // })
            // .sort([['updatedAt', -1]])
            .then((found) => {
                console.log(found)
                res.status(200).json(found)
            })
            .catch(next)
    }

    static getOne(req, res, next) {
        Question.findById(req.params.id)
            .populate({
                path: 'author',
                select: ['name', 'updatedAt']
            })
            .populate({
                path: 'answer',
                populate: [
                    {
                        path: 'author',
                        select: ['name', 'updatedAt']
                    }
                ]
            })
            .then((found) => {
                res.status(200).json(found)
            })
            .catch(next)
    }

    static edit(req, res, next) {
        let updatedData = {}
        updatedData.updatedAt = new Date()
        req.body.title && (updatedData.title = req.body.title)
        req.body.question && (updatedData.description = req.body.question)
        Question.findOneAndUpdate({ _id: req.params.id }, updatedData)
            .then(data => {
                if (data !== null) {
                    res.status(200).json({
                        message: "Success Update"
                    })
                } else {
                    res.status(404).json({
                        message: "Data is not found"
                    })
                }
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Question.findByIdAndDelete(req.params.id)
            .then((deleted) => {
                return Answer.findOneAndDelete({
                    questionId: req.params.id
                })
                    .then((deleteAnswer) => {
                        res.status(200).json(deleted)
                    })
            })
            .catch(next)
    }

    static upvote(req, res, next) {
        console.log(req.decode.id,"=========== upvote question")
        let UserId = req.decode.id
        let {
            id
        } = req.params
        Question.findOne({
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
                    return Question.findOne({
                        _id: id,
                        downvotes: UserId
                    })
                }
            })
            .then(response => {
                if (response) {
                    return Question.findByIdAndUpdate(id, {
                        $pull: {
                            downvotes: UserId
                        }
                    }, {
                        new: true
                    })
                } else {
                    return Question.findByIdAndUpdate(id, {
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
        let UserId = req.decode.id
        let {
            id
        } = req.params
        Question.findOne({
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
                    return Question.findOne({
                        _id: id,
                        upvotes: UserId
                    })
                }
            })
            .then(response => {
                if (response) {
                    return Question.findByIdAndUpdate(id, {
                        $pull: {
                            upvotes: UserId
                        }
                    }, {
                        new: true
                    })
                } else {
                    return Question.findByIdAndUpdate(id, {
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

module.exports = questionController




