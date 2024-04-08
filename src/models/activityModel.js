// Importation des modules nécessaires
const mongoose = require('mongoose');

// Schéma du modèle activité
const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true,
  },
  image: {
    type: String,//id de mon abonnement
    default:""
  },
  category: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  intensity: {
    type: String,
    required: true,
  },
  sportswear: {
    type: String,
    required: true,
  },
  muscleTarget: {
    type: String,
    required: true,
  },
  recommandations:{
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  ageMin: {
    type: Number,
  },
  ageMax: {
    type: Number,
  },
  imcMin: {
    type: Number,
  },
  imcMax: {
    type: Number,
  },
  frequencyMin: {
    type: Number,
  },
  frequencyMax: {
    type: Number,
  },
  goals: {
    type: [String], // Tableau de chaînes de caractères
    required: true, // Le tableau doit contenir au moins un élément
    validate: {
      validator: function(v) {
        return v && v.length > 0; // Vérifie que le tableau n'est pas vide
      },
      message: 'At least one goal is required' // Message d'erreur personnalisé si le tableau est vide
    }
  },
  ageGroup: {
    type: [String], // Tableau de chaînes de caractères
    required: true, // Le tableau doit contenir au moins un élément
    validate: {
      validator: function(v) {
        return v && v.length > 0; // Vérifie que le tableau n'est pas vide
      },
      message: 'At least one value is required' // Message d'erreur personnalisé si le tableau est vide
    }
  },
  advantages: {
    type: [String], // Tableau de chaînes de caractères
    required: true, // Le tableau doit contenir au moins un élément
    validate: {
      validator: function(v) {
        return v && v.length > 0; // Vérifie que le tableau n'est pas vide
      },
      message: 'At least one value is required' // Message d'erreur personnalisé si le tableau est vide
    }
  },
  whoelse: {
    type: [String], // Tableau de chaînes de caractères
  }
});

// Création du modèle 
const Activity = mongoose.model('Activity', activitySchema);

// Exportation du modèle
module.exports = Activity;
