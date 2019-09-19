const Answare = require('../models/answare');

class AnswareController {
    static findAll(req, res, next) {
        let where = {};
        if (req.query.content) {
            where = { "content": { $regex: '.*' + req.query.content + '.*' } }
        }
        Answare.find(where)
            .then(answares => {
                res.status(200).json(answares);
            }).catch(next);
    }

    static store(req, res, next) {
        const { content } = req.body;
        Answare.create(
            { content }
        ).then(answare => {
            res.status(201).json(answare)
        }).catch(next);
    }

    static findOne(req, res, next) {
        Answare.findOne({
            _id: req.params.id
        }).then(answare => {
            res.status(200).json(answare);
        }).catch(next);
    }

    static update(req, res, next) {
        const { content } = req.body;
        const data = { content };

        Answare.findOneAndUpdate({ _id: req.params.id }, data, { omitUndefined: true, runValidators: true })
            .then(data => {
                res.status(200).json({ message: 'successfully updated', data });
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Answare.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).json({ message: 'successfully deleted', data });
            })
            .catch(next);
    }
}

module.exports = AnswareController
