const router = require('express').Router()
const answerController = require('../controller/answer')
const {
    authentication
} = require('../middleware/authenticate')
const {
    authorized
} = require('../middleware/authorized')




router.use(authentication)
router.get('/', answerController.findAll)
router.post('/:id', answerController.create)



module.exports = router