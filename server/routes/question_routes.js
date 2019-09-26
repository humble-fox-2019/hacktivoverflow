const express = require('express');
const router = express.Router();
const {Authenthication , Authorized , AuthorizedQuestion} = require('../middleware')
const tag = require('../middleware/tag')

const { question_controller } = require('../controller')
router.use(Authenthication)

router.get('/'  , question_controller.getAll )
router.get('/searchtag' , question_controller.filterByTag)
router.post('/' , tag ,   question_controller.createQuestion2)
router.get('/:id'  , question_controller.detailQuestion)
router.put('/:id' ,  tag , AuthorizedQuestion,  question_controller.editQuestion);
router.delete('/:id' , AuthorizedQuestion , question_controller.deleteQuestion)


module.exports = router
