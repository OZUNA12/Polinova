const nodemailer = require('nodemailer');

// Configurar el servidor SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'cotiapp.dev@gmail.com',
      pass: 'rdlccaogysizwrvs'
    }
});

const sendMail = (to, subject, html)=>{
    const message = {
        from: 'cotiapp.dev@gmail.com', // Sender address
        to: to,         // List of recipients
        subject: subject, // Subject line
        html: html
    };
    
    transporter.sendMail(message, function(err, info) {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(info);
        }
    });
}

module.exports = sendMail;