const router = require('express').Router();
const authentication = require('../middlewares/authentication')
const QuestionController = require('../controllers/questionController')
const {questionAuth} = require('../middlewares/authorization')

router.post('/create', authentication, QuestionController.create)
router.put('/:id', authentication, questionAuth, QuestionController.updatePut)
router.delete('/:id', authentication, questionAuth, QuestionController.delete)
// router.get('/', (req, res)=> {
//    res.send('masuk gak???')
// })

module.exports = router