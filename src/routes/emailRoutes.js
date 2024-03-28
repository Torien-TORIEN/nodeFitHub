// Importation des modules nécessaires
const express = require('express');
const { authenticate } = require('passport');
const emailController = require('../controllers/emailController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

// Création du routeur
const router = express.Router();

router.post('/send-email', authMiddleware, emailController.sendMail);
// Ajoutez d'autres routes au besoin

// Exportation du routeur
module.exports = router;