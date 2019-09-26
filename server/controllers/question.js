const { Question, Answer } = require('../models')

class QuestionController {
  // need authentication
  static getAll(req, res, next) {
    Question.find().sort({ createdAt: -1 })
      .then(questions => {
        res.status(200).json({ questions })
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    const { id } = req.params
    Question.findById(id).populate({ path: 'answers', populate: { path: 'userId', model: 'User' } }).populate('userId')
      .then(question => {
        res.status(200).json({ question })
      })
      .catch(next)
  }

  static create(req, res, next) {
    const { title, description } = req.body
    const { userId } = req.decode

    Question.create({ title, description, userId })
      .then(question => {
        res.status(201).json({ question, message: 'Question succesfully created' })
      })
      .catch(next)
  }

  static upvote(req, res, next) {
    const { id } = req.params
    const { userId } = req.decode
    
    console.log(userId)

    Question.findById(id)
      .then(question => {
        console.log(question)
        if (!question.upvotes.includes(userId)) {
          const found = question.downvotes.indexOf(userId)
          if (found >= 0) {
            question.downvotes.splice(found, 1)
          }
          question.upvotes.push(userId)
          return question.save()
        } else {
          throw next({ status: 400, message: 'Bad request' })
        }
      })
      .then(question => {
        res.status(200).json({ question })
      })
      .catch(next)
  }

  static downvote(req, res, next) {
    const { id } = req.params
    const { userId } = req.decode


    Question.findById(id)
      .then(question => {
        if (!question.downvotes.includes(userId)) {
          const found = question.upvotes.indexOf(userId)
          if (found >= 0) {
            question.upvotes.splice(found, 1)
          }
          question.downvotes.push(userId)
          return question.save()
        } else {
          throw next({ status: 400, message: 'Bad request' })
        }
      })
      .then(question => {
        res.status(200).json({ question })
      })
      .catch(next)
  }

  static addAnswer(req, res, next) {
    const { id } = req.params
    const { userId } = req.decode
    const { description } = req.body

    console.log(id, description)
    Answer.create({ description, userId })
      .then(answer => {
        return Question.findByIdAndUpdate(id, { $push: { answers: answer._id } }, { new: true })
      })
      .then(question => {
        res.status(200).json({ question })
      })
      .catch(next)
  }

  // need authorization
  static update(req, res, next) {
    const { id } = req.params
    const { title, description } = req.body

    Question.findByIdAndUpdate(id, { title, description }, { new: true })
      .then(question => {
        res.status(200).json({ question, message: 'Updated' })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const { id } = req.params

    Question.findByIdAndDelete(id)
      .then(question => {
        // const promises = []
        // question.answers.forEach(el => {
        //   promises.push(Answer.findByIdAndDelete(el._id))
        // })
        // return Promise.all(promises)
        res.status(200).json({ question })
      })
      // .then(() => {
      //   res.status(200).json({ message: 'Succesfully deleted' })
      // })
      .catch(next)
  }
}

module.exports = QuestionController