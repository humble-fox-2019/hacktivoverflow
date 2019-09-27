var CronJob = require('cron').CronJob;
const question = require('./controllers/question');

function deleteQuestions() {
    new CronJob('0 0 * * *', function () {
        question.deleteByVotes();
    }, null, true, 'Asia/Jakarta');
}

module.exports = deleteQuestions;