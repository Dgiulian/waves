const nodemailer = require('nodemailer');
const { welcome } = require('./welcome_template');

const getEmailData = (to, name, token, type) => {
  let data = null;
  switch (type) {
  case 'welcome':
    data = {
      from: 'welcome@waves.com',
      to,
      subject: `Welcome to waves ${name}`,
      html: welcome()
    };
    break;
  default:
    return data;
  }
  return data;
};

const sendEmail = (to, name, token, type) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  const mail = getEmailData(to, name, token, type);
  return transporter
    .sendMail(mail)
    .then(() => console.log('Mail sent', transporter.close()))
    .catch(err => console.log(err));
};

module.exports = { sendEmail };
