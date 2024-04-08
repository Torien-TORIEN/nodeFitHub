const nodemailer = require('nodemailer');

//EMAILDE l'ADMINISTRATION
const adressMail="ambanja.toto@gmail.com";
const mdpass="wzvxzbwreqgextzt" 

class EmailService {
  constructor() {
    // Configurer le transporteur
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,//true for 465 , false for others
      logger: true,
      debug: true,
      secureConnection:false,
      auth: {
        user: process.env.EMAIL,//'email@gmail.com',
        pass: process.env.PWD,//'votre_mot_de_passe',
      },
      tls:{
        rejectUnauthorized:true,
      }
    });
  }

  // Méthode pour envoyer un e-mail
  sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }
}

module.exports = EmailService;
