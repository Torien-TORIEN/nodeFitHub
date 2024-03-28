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

const updateUserPassword = async (userId, newPassword) => {
  try {
    return await User.findByIdAndUpdate(userId, { motdepasse: newPassword }, { new: true });
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

const getUserById = async (userId) => {
  try {
    return await User.findById(userId);
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
    if (!user) {
      throw new Error('No user found with that login :'+email);
    }
    if(!(await bcrypt.compare(motdepasse, user.motdepasse))){
      throw new Error('Password incorrect');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {token, user};
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
