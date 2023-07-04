const nodemailer = require('nodemailer');
const logger = require('../log');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tcgvision0@gmail.com',
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendEmail = (to, content) => {
  const mailOptions = {
    from: 'tcgvision0@gmail.com',
    to,
    subject: 'Confirmation inscription',
    html: content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.log(error);
    } else {
      logger.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = sendEmail;
