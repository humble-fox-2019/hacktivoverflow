const CronJob = require('cron').CronJob;
const User = require('../models/User')
const sendEmail = require('../helpers/nodeEmailer')

new CronJob(' 0 8 * * 1', function() {

    User.find()
    .then(users=>{
        let promises = []
        for (let user of users){

            let email = user.email
            // promises.push(email)
            promises.push(sendEmail(email))
        }
        return Promise.all(promises)
    })
    .then(()=>{
    })
    .catch(err=>{
    })  
//   console.log('You will see this message every second');
}, null, true, 'Asia/Jakarta');

