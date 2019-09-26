const UserController = require('../controllers/user')
const express = require('express')
const router = express.Router()

router.post('/log',UserController.login)
router.get('/',UserController.read)

module.exports = router