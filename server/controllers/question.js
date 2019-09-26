const Question = require('../models/question');
const Answer = require('../models/answer')
class QuestionController {
    static register(req, res, next){
        const { title, description } = req.body
        Question.create({
            title, description, user: req.decode._id
        })
        .then(question =>{
            res.status(201).json(question)
        })
        .catch(next)
    }
    static update(req, res, next){
        const { title, description } = req.body
        Question.updateOne({
            _id: req.params.id
        },{ title, description })
        .then(_ =>{
            res.status(200).json({
                message: "successfully updated"
            })
        })
        .catch(next)
    }
    static getAllQuestions(req, res, next){
        Question.find().sort({ updatedAt: 'desc'}).populate('answers').then(questions => {
            if(questions){
                res.status(200).json(questions)
            }else{
                res.status(204).json({ message: "No question available"})
            }
        })
        .catch(next)
    }
    static getAQuestion(req, res, next){
        Question.findOne({
            _id: req.params.id
        }).populate('answers').populate('user')
        .then(question =>{
            res.status(200).json(question)
        })
        .catch(next)
    }
    static getQuestions(req, res, next){
        Question.find({
            user: req.decode._id
        }).sort({ updatedAt: 'desc'}).populate('answers')
        .then(questions =>{
            console.log(questions);
            if(questions){
                res.status(200).json(questions)
            }else{
                res.status(204).json({ message: "No question available"})
            }
        })
        .catch(next)
    }

    static upvote(req, res, next){

        Question.findOneAndUpdate({
            _id: req.params.id
        },{ $pull: { downvotes: req.decode._id}}, { new: true })
        .then(question =>{
            if(question.upvotes){
                if(!question.upvotes.includes(req.decode._id)){
                    question.upvotes.push(req.decode._id)
                    return Question.findOneAndUpdate({
                        _id: req.params.id
                    },{
                       upvotes: question.upvotes
                    },{ new: true }).populate('answers').populate('user')
                }else{
                    return Question.findOneAndUpdate({
                        _id: req.params.id
                    },{ $pull: { upvotes: req.decode._id}}, { new: true }).populate('answers').populate('user')
                    // throw ({ status: 400, message: "You already upvoted this question" })
                }
            }else{
                question.upvotes.push(req.decode._id)
                return Question.findOneAndUpdate({
                    _id: req.params.id
                },{
                   upvotes: question.upvotes
                },{ new: true }).populate('answers').populate('user')
            }
        })
        .then(question=>{
            res.status(200).json(question)
        })
        .catch(next)
    }

    static downvote(req, res, next){
        Question.findOneAndUpdate({
            _id: req.params.id
        },{ $pull: { upvotes: req.decode._id}}, { new: true })
        .then(question =>{
            if(question.downvotes){
                if(!question.downvotes.includes(req.decode._id)){
                    question.downvotes.push(req.decode._id)
                    return Question.findOneAndUpdate({
                        _id: req.params.id
                    },{
                       downvotes: question.downvotes
                    },{ new: true }).populate('answers').populate('user')
                }else{
                    return Question.findOneAndUpdate({
                        _id: req.params.id
                    },{ $pull: { downvotes: req.decode._id}}, { new: true }).populate('answers').populate('user')
                    // res.status(200).json({message: "Cancelled your "})
                    // throw ({ status: 400, message: "You already downvoted this question" })
                }
            }else{
                question.downvotes.push(req.decode._id)
                return Question.findOneAndUpdate({
                    _id: req.params.id
                },{
                   downvotes: question.downvotes
                },{ new: true }).populate('answers').populate('user')
            }
        })
        .then(question=>{
            res.status(200).json(question)
        })
        .catch(next)        
    }

    static remove(req, res, next){
        Question.findOneAndDelete({
            _id: req.params.id
        }).populate('answers')
        .then(question=> {
            let promise = []
            question.answers.forEach(answer =>{
                promise.push(Answer.deleteOne({
                    _id: answer._id
                }))
            })
            return Promise.all(promise)
        })
        .then(_=>{
            res.status(200).json({message: "Deleted!"})
        })
        .catch(next)

    }

}
module.exports = QuestionController