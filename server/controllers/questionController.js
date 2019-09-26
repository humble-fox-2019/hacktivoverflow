const Question = require('../models/question')
const Answer = require('../models/answer')

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

  static likeQuestion(req, res) {
    let loggedInUser = req.decoded._id
    Question.findOne({
      _id: req.params.id
    })
      .then(data_question => {
        if (data_question) {
          // console.log(loggedInUser, '<<<<< here');
          // console.log(data_question, 'its here <<<<');
          if (data_question.userId == loggedInUser) {
            res.status(400).json({
              message: `you cannot like your own question!`
            });
          } else {
            let status = false;
            for (let i in data_question.likes) {
              if (data_question.likes[i].userId == loggedInUser) {
                status = true;
              }
            }
            if (status) {
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
                    message: "You can't like your own answer"
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

  static getOne(req, res) {
    Question.findOne({
      _id: req.params.id
    })
      .populate({path: 'userId', select: 'email name'})
      .then(data_question => {
        Answer.find({questionId : req.params.id})
        .sort({ createdAt: -1 })
        .then(answer => {
          res.status(200).json({
            message: `Successfully get a question with id ${data_question._id}`,
            question: data_question,
            answer : answer
          });
        })
        .catch(err => {
          res.status(400).json({
            message: 'Data Not Found'
          });
        })
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({
          message: err.message
        });
      });
  };

  static dislikeQuestion(req, res) {
    let loggedInUser = req.decoded._id
    Question.findOne({
      _id: req.params.id
    })
      .then(data_question => {
        if (data_question) {
          // console.log(d);
          if (data_question.userId == loggedInUser) {
            res.status(400).json({
              message: `you cannot dislike your own question!`
            });
          } else {
            let status = false;
            for (let i in data_question.dislikes) {
              if ( data_question.dislikes[i].userId == loggedInUser){
                status = true;
              }
            }
            if (status) {
              res.status(400).json({
                message: `You already disllike this question!`
              });
            } else {
              Question.updateOne(
                {
                  _id: req.params.id
                },
                {
                  $push: { dislikes: { userId: loggedInUser } },
                  $pull: { likes: { userId: loggedInUser} }
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

  static getAll(req, res) {
    Question.find({})
    .populate({path: 'userId', select: 'email name'})
    .sort({ createdAt: -1 })
    .then(data_questions => {
            res.status(200).json({
              message: `Success get all questions list`,
              questions:  data_questions
        })
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({
          message: `Internal Server Error!`
        });
      });
  };
 
  static userQuestion(req, res) {
    Question.find({
      userId: req.decoded._id
    })
      .sort({ createdAt: -1 })
      .then(data_question => {
        res.status(200).json({
          message: "List of my questions",
          questions: data_question
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  };

  static normalizeOpinion(req, res){{
      let loggedInUser = req.decoded._id
      console.log(loggedInUser);
      Question.updateOne(
        {
          _id: req.params.id
        },
        {
          $pull: { dislikes: { userId: loggedInUser} , likes: { userId: loggedInUser} } 
        }
        
      )
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: `Your opinion is updated to netral `
          })
        })
        .catch(err => {
          res.status(400).json({
            message: "Data Not Found"
          })
        })
    }
  }
}

module.exports = QuestionController