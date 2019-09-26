var nodemailer = require('nodemailer');
require("dotenv").config()
const email = "uchihaske@yandex.com"
const password = "0721253062"

function sendEmail(person) {

    var transporter = nodemailer.createTransport({
        service: 'Yandex',
        auth: {
            user: email,
            pass: password
        }
    });

    var mailOptions = {
        from: email,
        to: `${person}`,
        subject: 'X overflow dengan valhalla',
        text: `Congratulations you get the most upvotes for your answer`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

// let person = "saveromuhammad@yahoo.com"
// let msg = "congratulation you get the most upvotes answer"

// sendEmail(person)

module.exports=sendEmail


