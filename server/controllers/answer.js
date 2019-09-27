const models = require("../models");

class Answer {
  static create(req, res, next) {
    let { description, questionId } = req.body;
    let UserId = req.decode.id;
    models.Answer.create({
      description,
      UserId
    })
      .then(data => {
        return models.Question.findByIdAndUpdate(
          questionId,
          { $push: { answers: data._id } },
          { new: true, runValidators: true }
        ).then(data => {
          res.status(200).json({
            data
          });
        });
      })
      .catch(next);
  }
}


module.exports = Answer