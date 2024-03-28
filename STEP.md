# Les Etapes suivies pour la réalisation de ce projet

## 1 Initiation
    npm init
    créer arboresence du projet (les dossiers, app.js, ect...)

## 2 Installation des packages
    On peut installer une à une
    npm install express body-parser mongoose cors helmet jsonwebtoken dotenv morgan bcrypt joi express-validator passport nodemailer--save

## 3 Devéloppement :
## 3.1 Configuration et env
     declarer les variables dans .env
        PORT=3000
        MONGO_URI=mongodb://localhost:27017/Nodejs_db
        JWT_SECRET=VotreCleSecreteJWT
        EMAIL="Votreemail@gmail.com" // A definir
        PWD="wzvxzbwreqgextzt"

     Donner les code de db.js
        const mongoose = require('mongoose');

        const connectDB = async () => {
            try {
                await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                });

                console.log('Connexion à la base de données établie');
            } catch (error) {
                console.error('Erreur de connexion à la base de données :', error.message);
                process.exit(1);
            }
        };

        module.exports = connectDB;
## 3.2 App.js
    Developper app.js

    // Importation des modules nécessaires
    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const helmet = require('helmet');
    const dotenv = require('dotenv');

    // Importation de la fonction connectDB
    const connectDB = require('./../config/db');

    // Chargement des variables d'environnement
    dotenv.config();

    // Initialisation de l'application Express
    const app = express();

    // Middleware pour analyser le corps des requêtes
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Middleware pour gérer les requêtes CORS
    app.use(cors());

    // Middleware pour sécuriser l'application Express
    app.use(helmet());

    // Connexion à la base de données MongoDB en utilisant la fonction connectDB
    connectDB();

    //-------------------------------------DEBUT:  Après avoir defini toutes les Routes ------------------------//

    //------------------------------------- FIN: Après avoir defini toutes les Routes ------------------------//

    // Port d'écoute du serveur
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    });


## 3.3 Developpement Model.js
    // Importation des modules nécessaires
        const mongoose = require('mongoose');

        // Schéma du modèle utilisateur
        const userSchema = new mongoose.Schema({
        nom: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        });

        // Création du modèle utilisateur
        const User = mongoose.model('User', userSchema);

        // Exportation du modèle
        module.exports = User;

## 3.4 Developpement Service.js
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    const User = require('../models/userModel');

    const addUser = async (nom, email, motdepasse) => {
        try {
            const hashedPassword = await bcrypt.hash(motdepasse, 10);
            const newUser = new User({
            nom,
            email,
            motdepasse: hashedPassword,
            });

            return await newUser.save();
        } catch (error) {
            throw error;
        }
    };

    const updateUser = async (userId, nom, email) => {
        try {
            return await User.findByIdAndUpdate(userId, { nom, email }, { new: true });
        } catch (error) {
            throw error;
        }
    };

    const getUserByNom = async (userNom) => {
        try {
            return await User.findOne({ nom: userNom });
        } catch (error) {
            throw error;
        }
    };

    const loginUser = async (email, motdepasse) => {
        try {
            const user = await User.findOne({ email });
            if (!user || !(await bcrypt.compare(motdepasse, user.motdepasse))) {
            throw new Error('Login or password incorrect');
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return token;
        } catch (error) {
            throw error;
        }
    };

    const getAllUsers = async () => {
        try {
            return await User.find();
        } catch (error) {
            throw error;
        }
    };

    module.exports = {
    addUser,
    updateUser,
    updateUserPassword,
    getAllUsers,
    getUserById,
    getUserByNom,
    loginUser,
    };

## 3.5 Developpement Controller

    const userService = require('../services/userService');

    const addUser = async (req, res) => {
    const { nom, email, motdepasse } = req.body;
    try {
        const newUser = await userService.addUser(nom, email, motdepasse);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { nom, email } = req.body;
    try {
        const updatedUser = await userService.updateUser(userId, nom, email);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    const updateUserPassword = async (req, res) => {
    const userId = req.params.id;
    const { newPassword } = req.body;
    try {
        const updatedUser = await userService.updateUserPassword(userId, newPassword);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
        return res.status(404).json({ message: 'User Not Found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    const getUserByNom = async (req, res) => {
    const userNom = req.params.nom;
    try {
        const user = await userService.getUserByNom(userNom);
        if (!user) {
        return res.status(404).json({ message: 'User Not Found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    const loginUser = async (req, res) => {
    const { email, motdepasse } = req.body;
    try {
        const token = await userService.loginUser(email, motdepasse);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(401).send('Login or password incorrect');
    }
    };

    module.exports = {
    addUser,
    updateUser,
    updateUserPassword,
    getAllUsers,
    getUserById,
    getUserByNom,
    loginUser,
    };


## 3.6 Developpement de Router
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
    router.post('/login',authenticate,userController.loginUser)
    router.post('/add', validationMiddleware,userController.addUser);
    router.put('/update/:id',authMiddleware, userController.updateUser);
    router.get('/', authMiddleware, userController.getAllUsers);
    router.get('/:id', authMiddleware, userController.getUserById);
    router.get('/:nom', authMiddleware, userController.getUserById);
    // Ajoutez d'autres routes au besoin

    // Exportation du routeur
    module.exports = router;

## 3.7 Ajouter les routers dans la App.js
    Ajouter les routes avant le demarrage du serveur

    //-------------------------------------DEBUT:  Après avoir defini toutes les Routes ------------------------//

    // Importation des routes
    const userRoutes = require('./routes/userRoutes.js');

    // Utilisation des routes dans l'application
    app.use('/users', userRoutes);

    //------------------------------------- FIN: Après avoir defini toutes les Routes ------------------------//

## 3.8 Requettes API Client :
    Installer une extension sur VScode API Client
    Créer un fichier .http (test.api.http)
        ### entre les requettes
        @nom_var=var_value 

            #Variables
            @token=ejheejeijeieiieiej

            # Add User
            POST http://localhost:3000/users/add
            Content-Type: application/json

            {
            "nom": "John",
            "email": "john@nodejs.com",
            "motdepasse": "111111"
            }

            # GET All Users
            GET http://localhost:3000/users
            Authorization:{{token}}





