const Question = require('../models/question')
const Answer = require('../models/answer')
function answerAuth( req, res, next ) {
    const userId = req.decode.id;
    const answerId = req.params.id;
    Answer.findById( answerId )
    .then( answer => {
        if ( answer ) {
            if ( answer.userId == userId ) next()
            else next({ status : 401 , message : "Not Authorized! Not your answer"})
        } else {
            next({ status: 404 , message: "Answer not Found"})
        }
    })
    .catch( next )
}
function questionAuth ( req ,res ,next ) {
    // Only Owner of the question can update / delete 
    const userId = req.decode.id;
    const questionId = req.params.id;
    Question.findById( questionId )
    .then( question => {
        if ( question ) {
            if ( question.userId == userId ) next()
            else next({ status: 401 , message: "Not Authorized! Not your question" })
        } else {
            next({ status : 404 , message : "Question not Found"})
        }
    })
    .catch( next )
}
function answerQuestionAuth( req, res ,next ){
    const { questionId } = req.body

    Question.findById( questionId )
    .then ( question => {
        if ( question ) next()
        else next({ status: 404 , message : "Question Not Found"})
    })
    .catch( next )
}
module.exports = {
    answerAuth,
    questionAuth,
    answerQuestionAuth
}