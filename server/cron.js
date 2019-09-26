const User = require('./models/user')
const mongoose = require('mongoose');
const emailSent = require('./helpers/mailer');

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect( DATABASE_URL , { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true , useFindAndModify: false })
.then ( _ => { console.log(`Database connected on : ` + DATABASE_URL ) })
.catch ( err => { console.log( "Database failed to connect"); console.log( err )})


var CronJob = require('cron').CronJob;

// Setiap 1 bulan
new CronJob('0 0 1 * *', function() {
    User.find()
    .then( users => {
        users.forEach( user =>{
            emailSent( user.email , 'AskOverflow' , `Come and ask more question and gain more knowledge!!`)
        })
    })
    .catch( console.log )
}, null, true, 'Asia/Jakarta')

// Yang sudah ditest

// new CronJob('* * * * * *', function() {
//     User.find()
//     .then( users => {
//         users.forEach( user =>{
//             emailSent( user.email , 'AskOverflow' , `Come and ask more question and gain more knowledge!!`)
//             console.log("EMAIL SENT to" , user.email)
//         })
//     })
//     .catch( console.log )
// }, null, true, 'Asia/Jakarta')
