const User = require('../models/user')
const {comparePassword} = require('../helpers/bcrypt')
const {getToken} = require('../helpers/jwt')

class UserController {
  static create(req, res) {
    const { name, email, password } = req.body;
    User.create({
      name: name,
      email: email,
      password: password
    })
      .then(data => {
        res.status(200).json({
          message: `Welcome new user!`,
          data
        });
      })
      .catch(err => {
        // console.log(err._message);
        res.status(400).json({
          message: err._message
        });
      });
  }

  static login(req, res) {
    const { email, password } = req.body;
    User.findOne({
      email: email
    })
      .then(data => {
        if (data) {
          let passwordCheck = comparePassword(password, data.password);
          if (passwordCheck) {
            let token = getToken(
              {
                _id: data._id,
                name: data.name,
                email: data.email
              }
            );
            res.status(200).json({
              message: `Welcome to Coder Fairy!`,
              token: token,
              email: data.email,
              _id : data._id
            });
          } else {
            res.status(400).json({
              message: `Email/Password is invalid`
            });
          }
        } else {
          res.status(400).json({
            message: `Email/Password is invalid`
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

module.exports = UserController
