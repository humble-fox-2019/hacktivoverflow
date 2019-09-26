const Answer = require('../models/answer');
const Question = require('../models/question')
// Create Update Read
class AnswerController {

    static getAll( req, res ,next ) {
        Answer.find().populate('userId')
        .then( answers => {
            res.status(200).json( answers )
        })
        .catch( next )
    }
    static getById ( req, res ,next ) {
        const answerId = req.params.id;
        Answer.findById( answerId ).populate('userId')
        .then( answer => {
            res.status(200).json( answer )
        })
        .catch( next )
    }
    static create ( req , res ,next ) {
        const { title, description , questionId } = req.body;
        const userId = req.decode.id
        Answer.create({ title, description , userId })
        .then( createdAnswer => {
            return Question.findOneAndUpdate(
                { _id : questionId },
                { $push : { answers : createdAnswer._id }},
                { new : true , runValidators : true }
            ).populate('answers')
        })
        .then ( AnsweredQuestion => {
            res.status(201).json({ message: "Answer Success!" , AnsweredQuestion})
        })
        .catch( next )
    }

    static deleteById( req, res ,next ) {
        const answerId = req.params.id;
        Answer.findByIdAndDelete( answerId )
        .then ( deletedAnswer => {
            return Question.findOneAndUpdate({ $pull : { answers : deletedAnswer._id}  })
        })
        .then( question => {
            res.status(200).json({ message : "Delete Success!" , question })
        })
        .catch( next )
    }

    static updateById ( req, res ,next ) {
        const { title , description } = req.body
        const answerId = req.params.id
        Answer.findOneAndUpdate( 
            { _id : answerId },
            { title , description },
            { new: true , runValidators: true }
        )
        .then( updatedAnswer => {
            res.status(200).json({ message: 'Update Success' , updatedAnswer })
        })
        .catch( next )

    }
    static upVote ( req, res ,next ){
        const answerId = req.params.id;
        const userId = req.decode.id;
        Answer.findOne({ _id : answerId , upVote : userId })
        .then( answer => {
            if ( answer ) throw { status : 400 , message: "You already UpVote!"}
            else return Answer.findOne({ _id : answerId , downVote : userId })
        })
        .then( answer => {
            if ( answer ) 
                return Answer.findOneAndUpdate(
                    { _id : answerId },
                    { $pull : { downVote : userId }},
                    { new : true }
                ) 
            else 
                return Answer.findOneAndUpdate(
                    { _id : answerId },
                    { $push : { upVote : userId }},
                    { new : true }
                )
        })
        .then ( answer => {
            res.status(200).json( answer )
        })
        .catch( next )
    }

    static downVote ( req ,res, next ){
        const answerId = req.params.id;
        const userId = req.decode.id;
        Answer.findOne({ _id : answerId , downVote : userId })
        .then( answer => {
            if ( answer ) throw { status : 200 , message: "You already DownVote!"}
            else return Answer.findOne({ _id : answerId , upVote : userId })
        })
        .then( answer => {
            if ( answer ) 
                return Answer.findOneAndUpdate(
                    { _id : answerId },
                    { $pull : { upVote : userId }},
                    { new : true }
                ) 
            else 
                return Answer.findOneAndUpdate(
                    { _id : answerId },
                    { $push : { downVote : userId }},
                    { new : true }
                )
        })
        .then ( answer => {
            res.status(200).json( answer )
        })
        .catch( next )

    }
}

module.exports = AnswerController