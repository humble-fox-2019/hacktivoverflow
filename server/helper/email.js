var nodemailer = require('nodemailer');
// require('dotenv').config()
const email = process.env.EMAIL
const password = process.env.PASSWORD_EMAIL
function sendEmail(person) {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: '',
            pass: ''
        }
    });

    var mailOptions = {
        from: 'charlottekatakuri450@gmail.com',
        to: `sultanrayhanh@gmail.com`,
        subject: 'Your Question',
        text: `tes kaK`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

// let person = "jackomoi14@gmail.com"
// // let msg = "congratulation you get the most upvotes answer"

// sendEmail(person)
// sendEmail()
module.exports=sendEmail