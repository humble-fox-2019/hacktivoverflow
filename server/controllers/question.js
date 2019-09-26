const models = require("../models");

class Question {
  static store(req, res, next) {
    const { title, description } = req.body;
    const userId = req.decode._id;
    models.Question.create({
      title,
      description,
      userId
    })
      .then(question => {
        res.status(201).json({
          type: "success",
          message: "Question Created"
        });
      })
      .catch(next);
  }

  static all(req, res, next) {
    models.Question.find()
      .then(allQuestions => {
        res.status(200).json({
          type: "success",
          allQuestions
        });
      })
      .catch(next);
  }

  static my(req, res, next) {
    const userId = req.decode._id;
    models.Question.find({
      userId
    })
      .then(myQuestions => {
        res.status(200).json({
          type: "success",
          myQuestions
        });
      })
      .catch(next);
  }

  static show(req, res, next) {
    const id = req.params.id;
    models.Question.findById(id)
      .populate({
        path: "answers userId",
        populate: {
          path: "userId"
        }
      })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }

  static upvote(req, res, next) {
    let userId = req.decode.id;
    let { _id } = req.body;
    models.Question.findOne({
      _id: _id,
      upvotes: userId
    })
      .then(data => {
        console.log(data);
        if (data) {
          throw {
            status: 400,
            message: "cant upvote"
          };
        } else {
          return models.Question.findOne({
            _id: _id,
            downvotes: userId
          });
        }
      })
      .then(response => {
        if (response) {
          return models.Question.findByIdAndUpdate(
            _id,
            {
              $pull: {
                downvotes: userId
              }
            },
            {
              new: true
            }
          );
        } else {
          return models.Question.findByIdAndUpdate(
            _id,
            {
              $push: {
                upvotes: userId
              }
            },
            {
              new: true
            }
          );
        }
      })
      .then(results => {
        res.status(200).json(results);
      })
      .catch(next);
  }

  static downvote(req, res, next) {
    let userId = req.decode.id;
    let { _id } = req.body;
    models.Question.findOne({
      _id: _id,
      downvotes: userId
    })
      .then(data => {
        if (data) {
          throw {
            status: 400,
            message: "cant upvote"
          };
        } else {
          return models.Question.findOne({
            _id: _id,
            upvotes: userId
          });
        }
      })
      .then(response => {
        if (response) {
          return models.Question.findByIdAndUpdate(
            _id,
            {
              $pull: {
                upvotes: userId
              }
            },
            {
              new: true
            }
          );
        } else {
          return models.Question.findByIdAndUpdate(
            _id,
            {
              $push: {
                downvotes: userId
              }
            },
            {
              new: true
            }
          );
        }
      })
      .then(results => {
        res.status(200).json(results);
      })
      .catch(next);
  }

  static top(req, res, next) {
    models.Top
      .findOne({
        status: "top"
      }).populate('questions')
      .then(data => {
        let top = data.questions;
        res.status(200).json({
          top
        });
      });
  }
}



module.exports = Question;
