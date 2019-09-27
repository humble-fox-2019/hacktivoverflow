const Answer = require("../models/answer");

class AnswerController {
  static create(req, res) {
    let loggedInUser = req.decoded._id
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
  

static getOneAnswer(req, res) {
  Answer.findOne({
    _id: req.params.id
  })
    .populate({path: 'userId', select: 'email name'})
    .populate("questionId")
    .then(result => {
      res.status(200).json({
        message: `Success get answer with id ${req.params.id}`,
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Data Not Found'
      });
    });
};

static likeAnswer(req, res){
  let loggedInUser = req.decoded._id;
  Answer.findOne({
    _id: req.params.id
  })
    .then(result => {
      if (result) {
        if (result.userId == loggedInUser) {
          res.status(400).json({
            message: `you cannot like your own answer!`
          })
        } else {
          let status = false;
          for (let i in result.likes) {
            if (result.likes[i].userId == loggedInUser) {
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

static dislikeAnswer(req, res) {
  let loggedInUser = req.decoded._id;
  Answer.findOne({
    _id: req.params.id
  })
    .then(result => {
      if (result) {
        if (result.userId == loggedInUser) {
          res.status(400).json({
            message: `you cannot dislike your own answer!`
          });
        } else {
          let status = false;
          for (let i in result.dislikes) {
            if (result.dislikes[i].userId == loggedInUser) {
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
                $push: { dislikes: { userId: loggedInUser } },
                $pull: { likes: { userId: loggedInUser } }
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

static normalizeOpinion(req, res){{
  let loggedInUser = req.decoded._id
  Answer.updateOne(
    {
      _id: req.params.id
    },
    {
      $pull: { dislikes: { userId: loggedInUser} , likes: { userId: loggedInUser} } 
    }
  )
    .then(result => {
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

module.exports = AnswerController


