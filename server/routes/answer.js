const router = require('express').Router();
const answer = require('../controllers/answer');
const { Authentication, AuthorizationAnswer } = require('../middlewares/authentication');

router.use(Authentication);
router.get('/:id', answer.readAnswer);
router.post('/:id', answer.create);
router.patch('/vote/:id', answer.vote);

module.exports = router;