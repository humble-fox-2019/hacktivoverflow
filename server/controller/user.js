const userModel = require('../model/user')
const {
    generateToken,
    verifyToken
} = require('../helper/jwt')
const {
    checkPass
} = require('../helper/hash')


class UserController {

    static register(req, res, next) {
        let obj = {
            email: req.body.email,
            user_name: req.body.name,
            password: req.body.password
        }

        console.log(obj, '<<< DATA YANG MASUK')

        userModel.create(obj)
            .then(data => {
                let payload = {
                    id: data._id,
                    user_name: data.user_name,
                    email: data.email
                }
                let token = generateToken(payload)
                console.log(token, '<<< token dari create user baru')
                console.log(data, '<<< berhasil di create datanya')

                res.status(201).json({
                    token,
                    id: data._id,
                    user_name: data.user_name,
                    email: data.email
                })
            })
            .catch(err => {
                console.log(err.message, '<<< errornya disini brother')
            })
    }

    static signIn(req, res, next) {
        console.log('berhasil masuk ke user signin')
        userModel.findOne({
                email: req.body.email
            })
            .then(data => {
                if (data) {
                    console.log(req.body.password, '<<< password')
                    console.log(data, '<<< ISINYA DATAAA')
                    if (checkPass(req.body.password, data.password)) {
                        let payload = {
                            id: data._id,
                            user_name: data.user_name,
                            email: data.email
                        }
                        let token = generateToken(payload)
                        console.log(token, '<<< INI TOKENNYA')
                        res.status(201).json({
                            token,
                            id: data._id,
                            user_name: data.user_name,
                            email: data.email
                        })
                        console.log('alhamdulillah berhasil masuk ke bagian ini')
                    }
                }


            })
            .catch(err => {
                console.log(err, '<<< ERORNYA TUH DISINI BRO')
            })

    }


}

module.exports = UserController