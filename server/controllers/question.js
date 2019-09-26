const Question = require('../models/question')
const Answer = require('../models/answer')
// CRUD
class QuestionController {

    static getAll( req, res , next ) {
        let search = {}
        if( req.query.search ) {
            search = {
                $or : [
                    { title : { $regex: req.query.search, $options: "i" } },
                    { tags  : { $regex: req.query.search, $options: "i" } }
                ]
            }
        }
        Question.find( search ).populate('userId')
        .then( questions => {
            res.status(200).json( questions )
        })
        .catch( next )
    }
    static getByUser( req, res ,next ) {
        const userId = req.decode.id;
        Question.find({ userId }).populate('userId')
        .then( questions => {
            res.status(200).json({ status: 200 , questions })
        })
        .catch( next )
    }
    static getOneById ( req, res ,next ) {
        const questionId = req.params.id;
        Question.findById( questionId ).populate('userId')
        .then( question => {
            res.status(200).json({ status: 200 , question })
        })
        .catch( next )
    }
    static searchByTitle ( req , res ,next ){
        const title = req.query.title 
        Question.find({ title : { $regex : title , $options: 'i' } })
        .then( questions => {
            res.status(200).json({ status: 200 , questions })
        })
        .catch( next )
    }

    static create( req, res, next ) {
        const userId = req.decode.id;
        const { title, description , tags } = req.body
        Question.create({ title, description, userId, tags })
        .then ( createdQuestion => {
            res.status(201).json({ status : 201 , createdQuestion })
        })
        .catch( next )
    }

    static updateById( req , res, next ) {
        const questionId = req.params.id
        const { title, description, tags } = req.body;
        Question.findOneAndUpdate(
            { _id : questionId },
            { title , description , tags },
            { new: true , runValidators : true }
        )
        .then( updatedQuestion => {
            if( !updatedQuestion ) 
                next({ status: 404, message: "Question not found!"})
            
            else res.status(200).json({ message: "Question Updated!" , updatedQuestion })
        })
        .catch( next )
    }

    static deleteById ( req, res, next ) {
        const questionId = req.params.id
        Question.findOneAndDelete({ _id : questionId })
        .then( deletedQuestion => {
            if( !deletedQuestion ) next({ status: 404, message: "Question not found!"})
            else {
                deletedQuestion.answers.forEach( answerId => {
                    Answer.findByIdAndDelete(answerId)
                    .then(_=>{})
                    .catch(_=>{})
                })
                res.status(200).json({ message : "Question deleted" , deletedQuestion })
            }
        })
        .catch( next )
    }

    static downVote( req, res, next ){
        const userId = req.decode.id;
        const questionId = req.params.id;
        Question.findOne({ _id : questionId , downVote : userId })
        .then( downVoted => {
            if ( downVoted ) 
                throw { status : 400 , message: "You already downVote!"}
            else 
                return Question.findOne({ _id : questionId , upVote : userId })
        })
        .then( upVotedQuestion => {
            if ( upVotedQuestion )  
                return Question.findOneAndUpdate(
                    { _id : questionId } , 
                    { $pull: { upVote: userId }}, 
                    { new: true }
                )
            else 
                return Question.findOneAndUpdate(
                    { _id : questionId } ,
                    { $push : { downVote : userId }},
                    { new : true }
                )
        })
        .then( question => {
            res.status(200).json({ message : "DownVote Success" , question })
        })
        .catch( next )
    }
    static upVote( req, res ,next ) {
        const userId = req.decode.id;
        const questionId = req.params.id;

        Question.findOne({ _id : questionId , upVote : userId })
        .then( upVoted => {
            if ( upVoted ) 
                throw { status : 400 , message: "You already upVote!"}
            else 
                return Question.findOne({ _id : questionId , downVote : userId })
        })
        .then( downVotedQuestion => {
            if ( downVotedQuestion )  
                return Question.findOneAndUpdate(
                    { _id : questionId } , 
                    { $pull: { downVote: userId }}, 
                    { new: true }
                )
            else 
                return Question.findOneAndUpdate(
                    { _id : questionId } ,
                    { $push : { upVote : userId }},
                    { new : true }
                )
        })
        .then( question => {
            res.status(200).json({ message : "UpVote Success" , question })
        })
        .catch( next )
    }
}

module.exports = QuestionController