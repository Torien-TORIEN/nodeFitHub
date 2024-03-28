// Importation des modules nécessaires
const express = require('express');
const { authenticate } = require('passport');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

// Création du routeur
const router = express.Router();


// Middleware spécifique à la route
//router.get('/login',authenticate, userController.loginUser);

// Middleware générale pour toutes les routes du fichier
// router.use(validationMiddleware);

// Autres routes...
router.post('/login',userController.loginUser)
router.post('/add', validationMiddleware,userController.addUser);
router.put('/update/:id',authMiddleware, userController.updateUser);
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.get('/name/:nom', authMiddleware, userController.getUserByNom);
// Ajoutez d'autres routes au besoin

// Exportation du routeur
module.exports = router;
