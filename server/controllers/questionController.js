const Question = require('../models/question')

class QuestionController {
  static create(req, res) {
    const { title, description } = req.body;
    let loggedInUser = req.decoded._id;
    Question.create({
      title: title,
      description: description,
      userId: loggedInUser
    })
      .then(data_question => {
        res.status(201).json({
          message: `Question Successfully Created!`,
          data: data_question
        });
      })
      .catch(err => {
        res.status(400).json({
          message: `Internal Server Error!`
        });
      });
  };

  static updatePut(req, res) {
    const { title, description } = req.body;
    Question.updateOne(
      {
        _id: req.params.id
      },
      { title, description }
    )
      .then(() => {
        res.status(200).json({
          message: "Success update your question"
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  };

  static delete(req, res) {
    Question.deleteOne({
      _id: req.params.id
    })
      .then(() => {
        res.status(200).json({
          message: "Success delete question"
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
    ;
  };

  // --------------------------------------

  static getAll(req, res) {
    Question.find({})
      .populate("userId")
      .populate("answerId")
      .sort({ createdAt: "desc" })
      .then(data_questions => {
        res.status(200).json({
          message: `Success get all questions list`,
          data: data_questions
        });
      })
      .catch(err => {
        res.status(400).json({
          message: `Internal Server Error!`
        });
      });
  };

  static getOne(req, res) {
    Question.findOne({
      _id: req.params.id
    })
      .populate("userId")
      .populate("answerId")
      .then(data_question => {
        res.status(200).json({
          message: `Successfully get a question with id ${data_question._id}`,
          data: data_question
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  };

  static getMyQuestions(req, res) {
    let token = req.headers.token;
    let loggedInUser = req.loggedInUser;

    Question.find({
      userId: req.loggedInUser._id
    })
      .populate("userId")
      .populate("answerId")
      .sort({ createdAt: "desc" })
      .then(data_question => {
        res.status(200).json({
          message: "List of my questions",
          data: data_question
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  };

  static likeQuestion(req, res) {
    let loggedInUser = req.decoded._id
    Question.findOne({
      _id: req.params.id
    })
      .then(data_question => {
        if (data_question) {
          if (String(data_question.userId) == String(loggedInUser)) {
            res.status(400).json({
              message: `you cannot like your own question!`
            });
          } else {
            let status = false;
            for (let i = 0; i < data_question.likes.length; i++) {
              if (data_question.likes[i].userId == loggedInUser) {
                status = true;
              }
            }
            if (status == true) {
              res.status(400).json({
                message: `You already like this question!`
              });
            } else {
              Question.updateOne(
                {
                  _id: req.params.id
                },
                {
                  $push: { likes: { userId: loggedInUser } },
                  $pull: { dislikes: { userId: loggedInUser } }
                }
              )
                .then(result => {
                  res.status(201).json({
                    message: `Like++`
                  });
                })
                .catch(err => {
                  res.status(400).json({
                    message: err.message
                  });
                });  
            }
          }
        } else {
          res.status(400).json({
            message: `Data not found!`
          });
        }
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  };

  static dislikeQuestion(req, res) {
    let token = req.headers.token;
    let loggedInUser = req.loggedInUser;
    Question.findOne({
      _id: req.params.id
    })
      .then(data_question => {
        if (data_question) {
          if (String(data_question.userId) == String(loggedInUser._id)) {
            res.status(400).json({
              message: `you cannot dislike your own question!`
            });
          } else {
            let status = false;
            for (let i = 0; i < data_question.dislikes.length; i++) {
              if (
                String(data_question.dislikes[i].userId) ==
                String(loggedInUser._id)
              ) {
                status = true;
              }
            }
            if (status == true) {
              res.status(400).json({
                message: `You already disllike this question!`
              });
            } else {
              Question.updateOne(
                {
                  _id: req.params.id
                },
                {
                  $push: { dislikes: { userId: loggedInUser.id } },
                  $pull: { likes: { userId: loggedInUser.id } }
                }
              )
                .then(result => {
                  res.status(201).json({
                    message: `Dislike++`
                  });
                })
                .catch(err => {
                  res.status(400).json({
                    message: err.message
                  });
                });
            }
          }
        } else {
          res.status(400).json({
            message: `Data not found!`
          });
        }
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  };
}

module.exports = QuestionController