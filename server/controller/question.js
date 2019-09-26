const answerModel = require('../model/answer')
const questionModel = require('../model/question')
const userModel = require('../model/user')


class QuestionController {


    static create(req, res, next) {

        console.log(req.body, '<<< ISIN BODYNYAAA')
        let obj = {
            title: req.body.title,
            content: req.body.content,
            userId: req.payload.id
        }
        console.log(obj, '<<< DARI CREATE LIAT ISINYA')
        questionModel.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err, '<< ERROR ADA DI CREATE QUESTION SERVER')
            })
    }

    static findAll(req, res, next) {
        questionModel.find()
            .populate('answers')
            .populate('userId')
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err, '<< ERRORNYA ADA DI FIND ALL QUESTION SERVER')
            })
    }

    static findOnebyId(req, res, next) {
        console.log(req.params.id, '< ini  req params idnya')
        questionModel.findById(req.params.id)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err, '<<< INI ERRNYA')
            })
    }

}

module.exports = QuestionController