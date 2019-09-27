const Question = require('../models/question')

class QuestionController {
    static create (req,res,next){
        Question.create({
            title : req.body.title,
            description : req.body.description,
            owner : req.decode.id
        })
        .then((question)=>{
            res.status(200).json({
                message : "added question",
                question
            })
        })
        .catch(next)
    }

    static read (req,res,next){
        Question.find().then((questions)=>{
            res.status(200).json({
                questions
            })
        }).catch(next)
    }

    static findByTitle (req,res,next){
        Question.find( { title : { "$regex": req.query.q, "$options": "i" }}).populate('owner')
        .then((questions)=>{
            res.status(200).json({
                questions
            })
        }).catch(next)
    }

    static findById (req,res,next){
        Question.findById( { _id : req.params.id } ).populate('owner')
        .then((question)=>{
            res.status(200).json({
                question
            })
        }).catch(next)
    }

    static update (req,res,next){
        Question.findByIdAndUpdate({ _id : req.params.id },{
            title : req.body.title,
            description : req.body.description,
            upvotes : req.body.upvotes,
            downvotes : req.body.downvotes
        },{ new : true, omitUndefined : true})
        .then((question)=>{
            res.status(200).json({
                question
            })
        })
        .catch(next)
    }

    static delete (req,res,next){
        Question.findByIdAndDelete({ _id : req.params.id })
        .then(()=>{
            res.status(200).json({
                message : "question deleted"
            })
        }). catch(next)
    }
}

module.exports = QuestionController