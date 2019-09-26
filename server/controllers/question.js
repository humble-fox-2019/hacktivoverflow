const Question = require('../models/Question')
const Comment = require('../models/Comment')
const Answer = require('../models/Answer')

class questionController {

  static create(req, res, next) {
    const { title, content, tags } = req.body
    const owner = req.decode.id
    Question.create({ title, content, owner, tags })
      .then(question => {
        res.status(201).json({ question })
      })
      .catch(next)
  }

  static getAll(req, res, next) {
    Question.find({}, 'title upvote downvote answers owner tags createdAt')
      .populate('owner', 'username')
      .sort({ createdAt: -1 })
      .then(questions => {
        res.json({ questions })
      })
      .catch(next)
  }

  static getMyQuestion(req, res, next) {

    const userId = req.decode.id

    Question.find({ owner: userId }, 'title upvote downvote answers tags')
      .sort({ createdAt: -1 })
      .then(questions => {
        res.json({ questions })
      })
      .catch(next)
  }

  static getDetail(req, res, next) {

    const questionId = req.params.id
    Question.findById(questionId)
      .populate('owner', 'username email')
      .populate({
        path: 'comments',
        options: {
          sort: {
            createdAt: -1
          }
        },
        populate: {
          path: 'owner',
          select: 'username email'
        }
      })
      .populate({
        path: 'answers',
        options: {
          sort: {
            createdAt: -1
          }
        },
        populate: {
          path: 'owner',
          select: 'username email'
        }
      })
      .sort({ createdAt: -1 })
      .then(question => {
        res.json({ question })
      })
      .catch(next)
  }

  static search(req, res, next) {
    let query = req.query.q
    let regex = new RegExp(query, 'i')

    Question.find({ title: regex }, 'title')
      .sort({ createdAt: -1 })
      .then(questions => {
        res.json({ questions })
      })
      .catch(next)
  }

  static getByTag(req, res, next) {

    const tag = req.params.tag.trim()
    
    Question.find({ tags: tag }, 'title upvote downvote answers owner tags')
      .populate('owner')
      .sort({ createdAt: -1 })
      .then(questions => {
        res.json({ questions })
      })
      .catch(next)
  }


  static remove(req, res, next) {

    const questionId = req.params.id

    Question.findByIdAndDelete(questionId)
      .then(question => {
        res.json({
          message: 'Success delete question'
        })
      })
      .catch(next)
  }

  static update(req, res, next) {

    const questionId = req.params.id
    const { title, content } = req.body

    Question.findByIdAndUpdate(questionId, {
      title,
      content
    }, {
      new: true,
      omitUndefined: true
    })
      .then(question => {
        res.json({ question })
      })
      .catch(next)

  }

  static vote(req, res, next) {

    Question.findById(req.params.id, 'upvote downvote')
      .then(question => {

        let isUpvote = false
        for(let i=0;i<question.upvote.length;i++) {
          if(question.upvote[i] == req.decode.id) {
            isUpvote = true
          }
        }

        let isDownvote = false
        for(let i=0;i<question.downvote.length;i++) {
          if(question.downvote[i] == req.decode.id) {
            isDownvote = true
          }
        }

        let vote = req.params.vote

        if(vote === 'up') {

          if(isUpvote) {
            //mengahapus upvote
            return Question.findByIdAndUpdate(req.params.id, {
              $pull : {
                upvote: req.decode.id
              }
            }, {
              new: true,
              useFindAndModify: false
            })
          }else {
            //menambah upvote
            return Question.findByIdAndUpdate(req.params.id, {
              $push : {
                upvote: req.decode.id
              },
              $pull : {
                downvote: req.decode.id
              }
            }, {
              new: true,
              useFindAndModify: false
            })
          }

        }else if(vote === 'down') {
          if(isDownvote) {
            //menghapus downvote
            return Question.findByIdAndUpdate(req.params.id, {
              $pull : {
                downvote: req.decode.id
              }
            }, {
              new: true,
              useFindAndModify: false
            })
          }else {
            //menambah downvote
            return Question.findByIdAndUpdate(req.params.id, {
              $push : {
                downvote: req.decode.id
              },
              $pull : {
                upvote: req.decode.id
              }
            }, {
              new: true,
              useFindAndModify: false
            })
          }
        }else {
          return new Promise((resolve, reject) => {
            reject({
              status: 400,
              message: 'Bad request'
            })
          })
        }


      })
      .then(question => {
        res.json({ question })
      })
      .catch(next)

  }

  static createComment(req, res, next) {

    let com = null

    Comment.create({
      owner: req.decode.id,
      content: req.body.content
    })
    .then(result => {
      com = result
      return Question.findByIdAndUpdate(req.params.id, {
        $push: {
          comments: result._id
        }
      }, {
        new: true,
        useFindAndModify: false
      })
    })
    .then( _ => {
      return Comment.findById(com._id)
      .populate('owner', 'username email')
    })
    .then(comment => {
      res.status(201).json({ comment })
    })
    .catch(next)


  }

  static createAnswer(req, res, next) {

    let result = null

    Answer.create({
      owner: req.decode.id,
      content: req.body.content
    })
    .then(answer => {
      result = answer
      return Question.findByIdAndUpdate(req.params.id, {
        $push: {
          answers: answer._id
        }
      }, {
        new: true,
        useFindAndModify: false
      })
    })
    .then( _ => {
      return Answer.findById(result._id)
        .populate('owner', 'username email')
    })
    .then(answer => {
      res.json({ answer })
    })
    .catch(next)
  }




}

module.exports = questionController
