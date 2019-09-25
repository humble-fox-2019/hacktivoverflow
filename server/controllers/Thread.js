
const Thread = require('../models/Thread');

class ThreadController {
    static create(req, res, next) {
        const { title, body, replies } = req.body
        Thread.create({ title, body, replies })
            .then((Thread) => {
                res.status(201).json(Thread)
            })
            .catch(next);
    };
    static read(req, res, next) {
        Thread.find({})
            .then((Threads) => {
                res.status(200).json(Threads)
            })
            .catch(next);
    };

    static update(req, res, next) {
        const id = req.params.id
        const { title, body, replies } = req.body
        Thread.update({ _id: id }, { $set: { title, body, replies } }, { runValidators: true })
            .then((Thread) => {
                res.status(200).json(Thread)
            }).catch(next);
    }

    static delete(req, res, next) {
        const id = req.params.id
        Thread.delete({ _id: id })
            .then((Thread) => {
                res.status(200).json(Thread)
            })
            .catch(next);
    };
};

module.exports = ThreadController
