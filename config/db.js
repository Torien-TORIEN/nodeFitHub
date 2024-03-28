//config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      //useNewUrlParser: true,/*useNewUrlParser était utilisé pour activer le nouveau parseur d'URL MongoDB dans Mongoose, mais il n'est plus nécessaire dans les versions récentes de Mongoose et peut être omis sans effet sur le fonctionnement de l'application.*/ 
      useUnifiedTopology: true,
    });

    console.log('Server is connecting on Mongodb');
  } catch (error) {
    console.error('Connexion on DB error :', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
