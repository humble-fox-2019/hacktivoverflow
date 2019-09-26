const router = require('express').Router();

const UserController = require('../controllers/userController');
const QuestionRoute = require('../routes/questionRoute');
const AnswerRoute = require('../routes/answerRoute');
const Nodemailer = require('../helpers/nodemailer');

router.get('/', (req, res) => {
    // Nodemailer('candrabe@gmail.com', "Hello testing")
    res.status(200).json({
        "message": 'ok'
    });
});

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

router.use("/questions", QuestionRoute);
router.use("/answers", AnswerRoute);

router.get('/*', (req, res, next) => {
    next({ statusCode: 404, msg: 'Route not found' });
});

module.exports = router
