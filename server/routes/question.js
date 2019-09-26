const router = require('express').Router()
const questionController = require('../controller/question')
const {
    authentication
} = require('../middleware/authenticate')
const {
    authorized
} = require('../middleware/authorized')

router.use(authentication)

router.post('/', questionController.create)
router.get('/', questionController.findAll)
router.get('/:id', questionController.findOnebyId)

module.exports = router