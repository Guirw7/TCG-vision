const nodemailer = require('nodemailer');
const logger = require('../log');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tcgvision0@gmail.com',
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendEmailResetPassword = (to, content, token) => {
  const mailOptions = {
    from: 'tcgvision0@gmail.com',
    to,
    subject: 'Réinitialisation mot de passe',
    html: content.replace('{{token}}', token), // Remplacer {{token}} par le token JWT
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.log(error);
    } else {
      logger.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = sendEmailResetPassword;
