const MailConfig = require('../configs/email')
const hbs = require('nodemailer-express-handlebars');
const gmailTransport = MailConfig.GmailTransport;
const smtpTransport = MailConfig.SMTPTransport;

function email(email, name) {
  MailConfig.ViewOption(gmailTransport, hbs);

  let HelperOptions = {
    from: '"HacktivOverflow" <hacktivOverflow@gmail.com>',
    to: email,
    subject: 'Hello !!',
    template: 'test',
    context: {
      name: name,
      email: email,
    }
  };

  gmailTransport.sendMail(HelperOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send(error);
    }
    console.log("email is send");
    console.log(info);
    res.send(info)
  });
}

module.exports = email