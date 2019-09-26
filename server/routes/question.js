const router = require('express').Router();
const question = require('../controllers/question');
const { Authentication, AuthorizationQuestion } = require('../middlewares/authentication');

router.use(Authentication);
router.post('/', question.create);
router.get('/', question.readAll);
router.get('/user', question.readUsers);
router.get('/tag', question.readTag);
router.get('/:id', question.readOne);
router.patch('/:id', AuthorizationQuestion, question.update);
router.patch('/vote/:id', question.vote);
router.delete('/:id', AuthorizationQuestion, question.delete);

module.exports = router;