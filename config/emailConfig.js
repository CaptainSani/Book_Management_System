const nodemailer = require('nodemailer');
const ejs = require('ejs');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const welcomeTemplate = async (user) => {
  const template = await ejs.renderFile('welcome.ejs', { user });
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject: 'Welcome to Book Management System',
    html: template,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent successfully');
    }
  });
};

module.exports = { welcomeTemplate };