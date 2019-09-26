const cron = require('node-cron')
const kue = require('kue')
const Questions = require('../models/question')
const nodemailer = require('./nodemailer')
const queue = kue.createQueue({
    redis: {
        host: 'localhost',
        port: 6379
    }
});

module.exports = () => {
    // '0 1 * * *'
    cron.schedule('0 1 * * *', () => {
        console.log('Hello scheduler');
        Questions
            .find()
            .populate('userId')
            .then(function (questions) {
                
                questions.forEach(el => {
                    let text = `Hello, ${el.userId.email}...
                    
            Your question "${el.title}" has been upvoted for ${el.upvotes.length} times and downvoted for ${el.downvotes.length} times.`
                    
                    let email = el.userId.email
                    queue.create('email', {
                        email,
                        text
                    }).save()
                    
                });
            })
            .catch(function (err) {
                console.log(err)
            });
        
        queue.process('email', 5, function (job, done) {
            nodemailer(job.data.email, job.data.text)
            done()
        })
    })
} 