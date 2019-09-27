const CronJob = require('cron').CronJob;
const Answer = require('./models/Answer')
const sendEmail = require('./helpers/nodeEmailer')

new CronJob('0 8 * * 1', function() {

    Answer.find().populate("UserId")
    .then(allanswers=>{
        
        let max = Number.MIN_SAFE_INTEGER
        let userEmail = ""
        if (allanswers.length>0){

            for (let answer of allanswers){
                let votes = answer.upvotes.length - answer.downvotes.length
                if(votes>max){
                    userEmail = answer.UserId.email
                    max = votes
                }
            }
            sendEmail(userEmail)
        }
    })

}, null, true, 'Asia/Jakarta');

