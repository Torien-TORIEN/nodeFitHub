
const EmailService = require('../services/emailService');

// Créer une instance du service d'e-mails
const emailService = new EmailService();

// Route pour envoyer un e-mail
sendMail=async (req, res) => {
  const { to, subject, text,html } = req.body;
    //console.log("Sending mail from :"+process.env.EMAIL+" to "+to)
  // Options de l'e-mail
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,// on peut utiliser text ou/et html mais quand on utilise html text ne sert à rien
    html
  };

  try {
    console.log("Sending Mail :",mailOptions)
    // Appeler la méthode du service pour envoyer l'e-mail
    const info = await emailService.sendEmail(mailOptions);
    res.status(200).json({ success: true, message: 'E-mail envoyé avec succès', data:info });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'e-mail :',error:error.message });
  }
};

module.exports = {sendMail};
