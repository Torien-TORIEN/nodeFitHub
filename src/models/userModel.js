// Importation des modules nécessaires
const mongoose = require('mongoose');

// Fonction de validation personnalisée pour l'email unique sur les comptes non supprimés
const uniqueEmailValidator = async function (value) {
  const existingUser = await this.constructor.findOne({ email: value, isDeleted: false });
  if (existingUser) {
    if (existingUser._id.equals(this._id)) {
      return true; // L'email appartient à cet utilisateur, donc pas de problème
    }
    return false; // L'email est déjà utilisé par un autre compte non supprimé
  }
  return true; // L'email est unique
};


// Fonction de validation de format d'email
const emailFormatValidator = function (value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value); // Retourne true si l'email est au bon format, sinon false
};

// Schéma du modèle utilisateur
const userSchema = new mongoose.Schema({
  picture: {
    type: String,
  },
  dateofbirth:{
    type:Date,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [
      { validator: uniqueEmailValidator, message: 'Email already exists in active accounts' }, // Utilisation de la fonction de validation personnalisée
      { validator: emailFormatValidator, message: 'Invalid email format' } // Utilisation de la fonction de validation de format d'email
    ],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['SUPER_ADMIN', 'ADMIN','CLIENT','COACH'], // Vous pouvez ajouter d'autres rôles au besoin
    default:'CLIENT',
  },
  gender: {
    type: String,
    required: true,
    enum: ['MALE', 'FEMALE'], // Vous pouvez ajouter d'autres rôles au besoin
  },
  subscription: {
    type: String,//id de mon abonnement
    default:""
  },
  myActivities: {
    type: [String],// id de mes activités
    default: [], // Assurez-vous de fournir une valeur par défaut appropriée
  },
  createdAt: {
    type: Date,
    default: Date.now, // Utilisez Date.now pour définir la date actuelle comme valeur par défaut
  },
  isDeleted:{
    type: Boolean,
    default:false,
    required : true
  },
  isDeactivated:{
    type: Boolean,
    default:false,
    required : true
  },
  isOnline:{
    type: Boolean,
    default:false,
    required : true
  },
});

// Création du modèle utilisateur
const User = mongoose.model('User', userSchema);

// Exportation du modèle
module.exports = User;
