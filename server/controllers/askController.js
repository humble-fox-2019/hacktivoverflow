const Ask = require('../models/ask');

class AskController {
    static findAll(req, res, next) {
        let where = {};
        if (req.query.title) {
            where = { "title": { $regex: '.*' + req.query.title + '.*' } }
        }
        Ask.find(where)
            .then(asks => {
                res.status(200).json(asks);
            }).catch(next);
    }

    static store(req, res, next) {
        const { title, content, answers } = req.body;
        Ask.create(
            { title, content, answers }
        ).then(ask => {
            res.status(201).json(ask)
        }).catch(next);
    }

    static findOne(req, res, next) {
        Ask.findOne({
            _id: req.params.id
        }).then(ask => {
            res.status(200).json(ask);
        }).catch(next);
    }

    static update(req, res, next) {
        const { title, content, answers } = req.body;
        const data = { title, content, answers };

        Ask.findOneAndUpdate({ _id: req.params.id }, data, { omitUndefined: true, runValidators: true })
            .then(data => {
                res.status(200).json({ message: 'successfully updated', data });
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Ask.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).json({ message: 'successfully deleted', data });
            })
            .catch(next);
    }
}

module.exports = AskController
