const Answer = require('../models/answer')

class AnswerController {
    static create (req,res,next){
        Answer.create({
            description : req.body.description,
            qId : req.params.qId,
            owner : req.decode.id
        })
        .then((answer)=>{
            res.status(200).json({
                message : "added answer",
                answer
            })
        })
        .catch(next)
    }

    static read (req,res,next){
        Answer.find().then((answers)=>{
            res.status(200).json({
                answers
            })
        }).catch(next)
    }

    static update (req,res,next){
        Answer.findByIdAndUpdate({ _id : req.params.id },{
            description : req.body.description,
            upvotes : req.body.upvotes,
            downvotes : req.body.downvotes
        },{ new : true, omitUndefined : true})
        .then((answer)=>{
            res.status(200).json({
                answer
            })
        })
        .catch(next)
    }

    static delete (req,res,next){
        Answer.findByIdAndDelete({ _id : req.params.id })
        .then(()=>{
            res.status(200).json({
                message : "answer deleted"
            })
        }). catch(next)
    }
}

module.exports = AnswerController