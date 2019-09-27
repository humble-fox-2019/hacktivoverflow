const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL, // generated ethereal user
    pass: process.env.GMAIL_PASSWORD // generated ethereal password
  }
});

module.exports = {
  sendMail (title, mails, content) {
    let mailPromises = []
    for (let i in mails) {
      let newPromise = new Promise ((resolve, reject) => {
        transporter.sendMail({
          from: 'tooOverflow@gmail.com', // sender address
          to: mails[i],
          subject: title,
          text: 'Hello world?',
          html: content
        })
        .then(info => {
          resolve(info)
        })
        .catch(err => {
          reject(err)
        })
      })
      mailPromises.push(newPromise)
    }
    Promise.all(mailPromises)
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
  }
}
