const User = require('./models/user')
const mongoose = require('mongoose');
const emailSent = require('./helpers/mailer');
const DATABASE_URL = process.env.ATLAS_CONNECT;
mongoose.connect( DATABASE_URL , { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true , useFindAndModify: false })
.then ( _ => { console.log(`Database connected on : ` + DATABASE_URL ) })
.catch ( err => { console.log( "Database failed to connect"); console.log( err )})
var CronJob = require('cron').CronJob;
// Setiap 1 bulan
new CronJob('0 0 1 * *', function() {
    User.find()
    .then( users => {
        users.forEach( user =>{
            emailSent( user.email , 'AIH (Answer is Here)' , `Come to AIH to get more answer`)
        })
    })
    .catch( console.log )
}, null, true, 'Asia/Jakarta')