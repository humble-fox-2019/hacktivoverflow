const Answer = require("../models/answer");

class AnswerController {
  static create(req, res) {
    let loggedInUser = req.decoded._id
    console.log(req.decoded);
    Answer.create({
      answer: req.body.answer,
      questionId: req.params.id,
      userId: loggedInUser
    })
      .then(result => {
        res.status(201).json({
          message: `Answer Succesfully Created!`,
          data: result
        });
      })
      .catch(err => {
        res.status(400).json({
          message: `Please input your answer!`
        });
      });
  };
  static updatePut(req, res) {
    const { answer } = req.body;
    Answer.update(
      {
        _id: req.params.id,
        userId: req.decoded._id
      },
      {
        answer: answer
      }
    )
      .then(() => {
        res.status(201).json({
          message: `answer successfully updated`
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }
  static delete(req, res){
    Answer.deleteOne({_id : req.params.id})
    .then(()=>{
      res.status(200).json({
        message : 'Success delete your answer'
      })
    })
    .catch(err =>{
      res.status(400).json({
        message: err.message
      });
    })
  }
  
  static getAllAnswerInQuestion(req, res) {
  console.log(req.params);

  Answer.find({
    questionId: req.params.question
  })
    .populate("userId")
    .populate("questionId")
    .sort({ createdAt: "asc" })
    .then(result => {
      res.status(200).json({
        message: `Success get All Answer with questionId ${
          req.params.question
          }`,
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

static getOneAnswer(req, res) {
  let token = req.headers.token;
  Answer.findOne({
    _id: req.params.id
    // userId: req.loggedInUser.id
  })
    .populate("userId")
    .then(result => {
      res.status(200).json({
        message: `Success get answer with id ${req.params.id}`,
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

static likeAnswer(req, res){
  let token = req.headers.token;
  let loggedInUser = req.loggedInUser;
  Answer.findOne({
    _id: req.params.id
  })
    .then(result => {
      if (result) {
        if (String(result.userId) == String(loggedInUser._id)) {
          res.status(400).json({
            message: `you cannot like your own answer!`
          });
        } else {
          let status = false;
          for (let i = 0; i < result.likes.length; i++) {
            if (result.likes[i].userId == loggedInUser._id) {
              status = true;
            }
          }
          if (status == true) {
            res.status(400).json({
              message: `You already like this answer!`
            });
          } else {
            Answer.updateOne(
              {
                _id: req.params.id
              },
              {
                $push: { likes: { userId: loggedInUser.id } },
                $pull: { dislikes: { userId: loggedInUser.id } }
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

static dislikeAnswer(req, res) {
  let token = req.headers.token;
  let loggedInUser = req.loggedInUser;
  Answer.findOne({
    _id: req.params.id
  })
    .then(result => {
      if (result) {
        if (String(result.userId) == String(loggedInUser._id)) {
          res.status(400).json({
            message: `you cannot dislike your own answer!`
          });
        } else {
          let status = false;
          for (let i = 0; i < result.dislikes.length; i++) {
            if (String(result.dislikes[i].userId) == String(loggedInUser._id)) {
              status = true;
            }
          }
          if (status == true) {
            res.status(400).json({
              message: `You already disllike this answer!`
            });
          } else {
            Answer.updateOne(
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

module.exports = AnswerController


