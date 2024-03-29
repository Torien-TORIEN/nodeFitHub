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
router.post('/', /*validationMiddleware,*/userController.addUser);
router.put('/update/:id',authMiddleware, userController.updateUser);
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.get('/email/:email', authMiddleware, userController.getUserByEmail);
router.get('/role/:role', authMiddleware, userController.getUserByRole);
router.put('/disconnect/:id', authMiddleware, userController.disconnectUser);
router.put('/deactivate/:id', authMiddleware, userController.deactivateAccount);
router.put('/activate/:id', authMiddleware, userController.activateAccount);
router.delete('/:id', authMiddleware, userController.deleteUser);
// Ajoutez d'autres routes au besoin

// Exportation du routeur
module.exports = router;
