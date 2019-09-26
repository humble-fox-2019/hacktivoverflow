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
          const index = question.upvotes.indexOf(userId)
          question.upvotes.splice(index, 1)
          return question.save()
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
          const index = question.downvotes.indexOf(userId)
          question.downvotes.splice(index, 1)
          return question.save()
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
    Answer.create({ description, userId, questionId: id })
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
        return Answer.deleteMany({ questionId: question._id })
      })
      .then(() => {
        res.status(200).json({ message: 'Question succesfully deleted' })
      })
      .catch(next)
  }
}

module.exports = QuestionController