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
  motdepasse: {
    type: String,
    required: true,
  },
});

// Création du modèle utilisateur
const User = mongoose.model('User', userSchema);

// Exportation du modèle
module.exports = User;
