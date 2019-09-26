const router = require('express').Router();
const answer = require('../controllers/answer');
const { Authentication, AuthorizationAnswer } = require('../middlewares/authentication');

router.use(Authentication);
router.get('/:id', answer.readAnswer);
router.get('/edit/:id', AuthorizationAnswer, answer.readOne);
router.post('/:id', answer.create);
router.patch('/vote/:id', answer.vote);
router.patch('/edit/:id', AuthorizationAnswer, answer.edit);
router.delete('/:id', AuthorizationAnswer, answer.delete);

module.exports = router;