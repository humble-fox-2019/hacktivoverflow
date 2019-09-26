const { Question, Answer } = require('../models')

class AnswerController {
  // static create(req, res, next) {
  //   const { description } = req.body
  //   const { userId } = req.decode

  //   Answer.create({ description, userId })
  //     .then(answer => {
  //       res.status(201).json({ answer })
  //     })
  //     .catch(next)
  // }

  static getOne(req, res, next) {
    const { id } = req.params
    Answer.findById(id)
      .then(answer => {
        res.status(200).json({ answer })
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { id } = req.params
    const { description } = req.body

    Answer.findByIdAndUpdate(id, { description }, { new: true })
      .then(answer => {
        res.status(200).json({ answer })
      })
      .catch(next)
  }

  static upvote(req, res, next) {
    const { id } = req.params
    const { userId } = req.decode

    Answer.findById(id)
      .then(answer => {
        if (!answer.upvotes.includes(userId)) {
          const found = answer.downvotes.indexOf(userId)
          if (found >= 0) {
            answer.downvotes.splice(found, 1)
          }
          answer.upvotes.push(userId)
          return answer.save()
        } else {
          const index = answer.upvotes.indexOf(userId)
          answer.upvotes.splice(index, 1)
          return answer.save()
        }
      })
      .then(answer => {
        res.status(200).json({ answer })
      })
      .catch(next)
  }

  static downvote(req, res, next) {
    const { id } = req.params
    const { userId } = req.decode


    Answer.findById(id)
      .then(answer => {
        if (!answer.downvotes.includes(userId)) {
          const found = answer.upvotes.indexOf(userId)
          if (found >= 0) {
            answer.upvotes.splice(found, 1)
          }
          answer.downvotes.push(userId)
          return answer.save()
        } else {
          const index = answer.downvotes.indexOf(userId)
          answer.downvotes.splice(index, 1)
          return answer.save()
        }
      })
      .then(answer => {
        res.status(200).json({ answer })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const { id } = req.params

    Answer.findByIdAndDelete(id)
      .then(answer => {

        return Question.findByIdAndUpdate(answer.questionId, { $pull: { answers: answer._id } })
      })
      .then(question => {
        res.status(200).json({ question })
      })
      .catch(next)
  }
}

module.exports = AnswerController