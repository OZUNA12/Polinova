const nodemailer = require('nodemailer');

// Configurar el servidor SMTP

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.gmail.com',
    port: 465,
    auth: {
      user: 'cotiapp.sender@gmail.com',
      pass: 'dbddvklzzigavyci',
      
    }
});

/*var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f3bb68b5782b23",
    pass: "f90acb4f439a85"
  }
});*/

const sendMail = async(to, subject, html, dir, callback)=>{
    const message = {
        from: 'cotiapp.sender@gmail.com', // Sender address
        to: to,         // List of recipients
        subject: subject, // Subject line
        html: html,
        attachments: [
          {
              filename: dir,
              path: 'src/pdf/'+dir
          }
      ]
    };
    
    await transporter.sendMail(message, function(err, info) {
        if (err) {
          console.log(err.stack);
          callback(false);
        } else {
          console.log(info);
          callback(true);
        }
    });

}

module.exports = sendMail;