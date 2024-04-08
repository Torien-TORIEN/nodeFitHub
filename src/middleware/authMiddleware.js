const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateUser = async (req, res, next) => {
  // console.log("Authorization received :"+req.header('Authorization'))
  // const token = req.header('Authorization');// req= Authorization:mon_toke_sans_guillemets

  //req=Authorization: Bearer mon_toke_sans_guillemets
  const token = req.header('Authorization').slice(7); // Retirer le préfixe 'Bearer ' pour obtenir le token seul


  //console.log("token received :"+token)

  if (!token) {//il faut vérifier que la requette ait le token
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);//ecoder user
    const user = await User.findById(decoded.userId);//trouver user
    
    if (!user) {
      console.log("Invalid token 1")
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = user; //ajouter dans la requette user
    
    console.log("\n\t valid token ")
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
    console.log("Invalid token 2 : ",error.message)
  }
};

module.exports = authenticateUser;
