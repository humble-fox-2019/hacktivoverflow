const Answer = require('../models/answer');
const Question = require('../models/question');

class AnswerController {
    static register(req, res, next){
        const { description } = req.body
        let questionData = null
        Question.findOne({
            _id: req.params.questionId
        }).populate('answers')
        .then(question =>{
            questionData = question
            return Answer.create({
                description, user: req.decode._id, question: questionData._id
            })
        })
        .then(answer =>{
            questionData.answers.push(answer._id)
            return Question.findOneAndUpdate({
                _id: req.params.questionId
            },{ answers: questionData.answers}, { new: true }).populate('answers')
        })
        .then(answer =>{
            res.status(201).json(answer)
        })
        .catch(next)
    }
    static remove(req, res, next){
        Answer.findOneAndDelete({
            _id: req.params.id
        })
        .then(answer =>{
            return Question.updateOne({
                _id: answer.question
            },{ $pull: { answers: answer._id}})
        })
        .then(_=>{
            res.status(200).json({ message: "success"})
        })
        .catch(next)
    }
    static getAllAnswer(req, res, next){
        Answer.find({
            question: req.params.questionId
        })
        .then(answers =>{
            if(answers)res.status(200).json(answers)
            else res.status(204).json(answers)
        })
        .catch(next)
    }
    static updateDescription(req, res, next){
        const { description } = req.body
        Answer.findByIdAndUpdate({
            _id: req.params.id
        },{ description })
        .then(answer=>{
            return Question.findOne({
                _id: answer.question
            }).populate('answers').populate('user')
        })
        .then(question =>{
            res.status(200).json(question)
        })
        .catch(next) 
    }
    static upvote(req, res, next){
        let questionId = null
        Answer.findOneAndUpdate({
            _id: req.params.id
        }, { $pull: { downvotes: req.decode._id}}, {new: true})
        .then(answer =>{
            questionId = answer.question
            if(answer.upvotes){
                if(!answer.upvotes.includes(req.decode._id)){
                    answer.upvotes.push(req.decode._id)
                    return Answer.findOneAndUpdate({
                        _id: req.params.id
                    },{
                       upvotes: answer.upvotes
                    },{ new: true })
                }else{
                    return Answer.findOneAndUpdate({
                        _id: req.params.id
                    }, { $pull: { upvotes: req.decode._id}}, {new: true})
                    // throw ({ status: 400, message: "You already upvoted this answer" })
                }
            }else{
                answer.upvotes.push(req.decode._id)
                return Answer.findOneAndUpdate({
                    _id: req.params.id
                },{
                   upvotes: answer.upvotes
                },{ new: true })
            }
        })
        .then(answer=>{
            return Question.findOne({
                _id: questionId
            }).populate('answers').populate('user')
        })
        .then(question =>{
            res.status(200).json(question)
        })
        .catch(next)
    }

    static downvote(req, res, next){
        let questionId = null
        Answer.findOneAndUpdate({
            _id: req.params.id
        },{ $pull: { upvotes: req.decode._id}}, {new: true})
        .then(answer =>{
            questionId = answer.question
            if(answer.downvotes){
                if(!answer.downvotes.includes(req.decode._id)){
                    answer.downvotes.push(req.decode._id)
                    return Answer.findOneAndUpdate({
                        _id: req.params.id
                    },{
                       downvotes: answer.downvotes
                    },{ new: true })
                }else{
                    return Answer.findOneAndUpdate({
                        _id: req.params.id
                    },{
                       downvotes: answer.upvotes
                    },{ new: true })
                    // throw ({ status: 400, message: "You already downvoted this answer" })
                }
            }else{
                answer.downvotes.push(req.decode._id)
                return Answer.findOneAndUpdate({
                    _id: req.params.id
                },{
                   downvotes: answer.downvotes
                },{ new: true })
            }
        })
        .then(answer=>{
            return Question.findOne({
                _id: questionId
            }).populate('answers').populate('user')
        })
        .then(question =>{
            res.status(200).json(question)
        })
        .catch(next)        
    }
}

module.exports = AnswerController