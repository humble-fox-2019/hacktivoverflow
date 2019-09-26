const express = require('express')
const userRouter = require('./user')
const questionRouter = require('./question')
const answerRouter = require('./answer')
const User = require('../models/user')
const router = express.Router()

const MailConfig = require('../config/email');
const hbs = require('nodemailer-express-handlebars');
const gmailTransport = MailConfig.GmailTransport;
const smtpTransport = MailConfig.SMTPTransport;

var CronJob = require('cron').CronJob;
new CronJob('* * */1 * *', function () {

    User.find()
        .then(users => {
            users.forEach(user => {
                MailConfig.ViewOption(gmailTransport, hbs);
                let HelperOptions = {
                    from: '"Maulana Ghozi" <ghozihz@@gmail.com>',
                    to: `${user.email}`,
                    subject: 'Tanyao',
                    template: 'test',
                    context: {
                        name: `${user.name}`,
                        email: `${user.email}`
                    }
                };
                gmailTransport.sendMail(HelperOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        res.json(error);
                    }
                    console.log("email is send");
                    console.log(info);
                    res.json(info)
                });
            })
        })

}, null, true, 'Asia/Jakarta');

router.use('/users', userRouter)
router.use('/questions', questionRouter)
router.use('/answers', answerRouter)
module.exports = router