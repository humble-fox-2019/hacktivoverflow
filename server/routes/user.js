const router = require('express').Router()



const userController = require('../controller/user')




router.post('/register', userController.register)
router.post('/signIn', userController.signIn)


module.exports = router