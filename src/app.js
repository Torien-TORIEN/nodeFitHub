//app.js

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
//Taille de payload par defaut : 100KB
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));*/

// Augmentez la limite de taille de la charge utile
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Middleware pour gérer les requêtes CORS
app.use(cors());

// Middleware pour sécuriser l'application Express
app.use(helmet());

// Connexion à la base de données MongoDB en utilisant la fonction connectDB
connectDB();

//-------------------------------------DEBUT:  Après avoir defini toutes les Routes ------------------------//

// Importation des routes
const userRoutes = require('./routes/userRoutes.js');
const emailRoutes=require('./routes/emailRoutes.js');
const activityRoutes = require('./routes/activityRoutes.js');

// Utilisation des routes dans l'application
app.use('/api/fithub/users', userRoutes);
app.use('/api/fithub/email', emailRoutes);
app.use('/api/fithub/activities', activityRoutes);



//------------------------------------- FIN: Après avoir defini toutes les Routes ------------------------//

// Port d'écoute du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
