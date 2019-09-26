var MailConfig = require('../config/email');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;

const User = require('../models/user');
const router = require('express').Router()
const answerRouter =  require('./answer');
const questionRouter =  require('./question');
const userRouter = require('./user');

router.get('/', function(req, res, next){
    res.status(200).json({
        message: 'connected'
    })
})

var CronJob = require('cron').CronJob;
new CronJob('0 0 1 * *', function() {
    
    User.find()
    .then(users =>{
        users.forEach(user =>{
            MailConfig.ViewOption(gmailTransport,hbs);
            let HelperOptions = {
              from: '"Tatag Wibowo" <tatagwibowo95@gmail.com>',
              to: `${user.email}`,
              subject: 'NgeStuckFlow',
              template: 'test',
              context: {
                name:`${user.username}`,
                email: `${user.email}`
              }
            };
            gmailTransport.sendMail(HelperOptions, (error,info) => {
              if(error) {
                console.log(error);
                res.json(error);
              }
              console.log("email is send");
              console.log(info);
              res.json(info)
            });
        })
    })

  
}, null, true, 'America/Los_Angeles');


router.use('/users', userRouter)
router.use('/questions', questionRouter)
router.use('/answers', answerRouter)

module.exports = router