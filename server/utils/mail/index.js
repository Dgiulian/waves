const nodemailer = require('nodemailer');
const { welcome } = require('./welcome_template');
const { resetPassword }  = require('./reset_password');

const getEmailData = (to, name, token, type, actionData) => {
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
  case 'reset_password':
    data = {
      from: 'reset@waves.com',
      to,
      subject: 'Reset your waves password',
      html: resetPassword(actionData)
    };
    break;
  default:
    return data;
  }
  return data;
};

const sendEmail = (to, name, token, type, actionData = null) => {
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
  const mail = getEmailData(to, name, token, type, actionData);
  return transporter
    .sendMail(mail)
    .then(() => console.log('Mail sent', transporter.close()))
    .catch(err => console.log(err));
};

module.exports = { sendEmail };
