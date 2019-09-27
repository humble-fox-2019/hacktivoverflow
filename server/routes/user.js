const router = require('express').Router()
const userController = require('../controllers/user')
const userAuthentication = require('../middleware/userAuthentication')

router.post('/signin', userController.signin)
router.post('/signup', userController.signup)
router.get('/get-user-data', userAuthentication, userController.getUserData)
router.put('/add-tag', userAuthentication, userController.addTag)
router.put('/remove-tag', userAuthentication, userController.removeTag)


module.exports = router

