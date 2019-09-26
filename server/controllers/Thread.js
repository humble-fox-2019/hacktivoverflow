
const Thread = require('../models/Thread');

class ThreadController {
    static createThread(req, res, next) {
        const userId = req.decode.id
        const { title, body } = req.body
        Thread.create({ title, body, owner: userId, thread: true })
            .then((Thread) => {
                res.status(201).json(Thread)
            })
            .catch(next);
    };
    static read(req, res, next) {
        Thread.find({ thread: true })
            .populate('owner')
            .then((Threads) => {
                res.status(200).json(Threads)
            })
            .catch(next);
    };

    static readMine(req, res, next) {
        const id = req.decode.id
        Thread.find({ owner: id, thread: true })
            .then((Threads) => {
                res.status(200).json(Threads)
            }).catch(next);
    }

    static readThread(req, res, next) {
        const id = req.params.id
        Thread.findById({ _id: id })
            .populate('owner', '-password')
            .populate({
                path: ' replies',
                populate: { path: 'owner' }
            })

            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static replyThread(req, res, next) {
        const id = req.params.id
        const { title, body } = req.body
        const userId = req.decode.id
        Thread.create({ title, body, owner: userId })
            .then(reply => {
                return Thread.findByIdAndUpdate(id, { $push: { replies: reply._id } }, { new: true }).populate('replies')
            })
            .then(Thread => {
                res.status(201).json(Thread)
            })
            .catch(next)
    }



    static update(req, res, next) {
        const id = req.params.id
        const { title, body } = req.body
        Thread.findByIdAndUpdate(id, { $set: { title, body } }, { runValidators: true, new: true })
            .then((Thread) => {
                res.status(200).json(Thread)
            }).catch(next);
    }

    static updateReply(req, res, next) {
        const replyId = req.params.replyId
        const { title, body } = req.body
        Thread.findByIdAndUpdate(replyId, { $set: { title, body } }, { runValidators: true, new: true })
            .then((Thread) => {
                res.status(200).json(Thread)
            }).catch(next);
    }

    static delete(req, res, next) {
        const id = req.params.id
        Thread.findByIdAndDelete(id)
            .then((Thread) => {
                res.status(200).json(Thread)
            })
            .catch(next);
    };

    static deleteReply(req, res, next) {
        const threadId = req.params.id
        const replyId = req.params.replyid
        Thread.findByIdAndUpdate(threadId, { $pull: { replies: replyId } }, { new: true })
            .then((Thread) => {
                res.status(200).json(Thread)
            })
            .catch(next)
    }

    static upvote(req, res, next) {
        let id = req.params.id
        let userId = req.decode.id
        Thread.findByIdAndUpdate(id, { $pull: { downvotes: userId }, $push: { upvotes: userId } })
            .then((Thread) => {
                res.status(200).json(Thread)
            }).catch(next);
    }

    static downvote(req, res, next) {
        let id = req.params.id
        let userId = req.decode.id
        Thread.findByIdAndUpdate(id, { $pull: { upvotes: userId }, $push: { downvotes: userId } })
            .then((Thread) => {
                res.status(200).json(Thread)
            }).catch(next);
    }

    static removeVote(req, res, next) {
        let id = req.params.id
        let userId = req.decode.id
        Thread.findByIdAndUpdate(id, { $pull: { upvotes: userId, downvotes: userId } })
            .then((Thread) => {
                res.status(200).json(Thread)
            }).catch(next);
    }
};

module.exports = ThreadController
