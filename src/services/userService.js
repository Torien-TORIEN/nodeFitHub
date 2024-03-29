const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const addUser = async (user) => {
  try {
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...user, password: hashedPassword });
    return await newUser.save();
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, user) => {
  try {
    return await User.findByIdAndUpdate(userId, user, { new: true });
  } catch (error) {
    throw error;
  }
};

const updateUserPassword = async (userId, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    return await User.find({ isDeleted: false , isDeactivated : false});
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

const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email ,isDeleted :false , isDeactivated : false });
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    console.log(`user :${user }`)
    if (!user) {
      throw new Error('No user found with that email.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Incorrect password.');
    }

    // Mettre isOnline à true lors de la connexion
    user.isOnline = true;
    await user.save();


    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    // Vous pouvez ajouter une logique supplémentaire ici, par exemple, vérifier si l'utilisateur existe avant de le supprimer
    return await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
  } catch (error) {
    throw error;
  }
};

const deactivateAccount = async (userId) => {
  try {
    return await User.findByIdAndUpdate(userId, { isDeactivated: true }, { new: true });
  } catch (error) {
    throw error;
  }
};

const activateAccount = async (userId) => {
  try {
    return await User.findByIdAndUpdate(userId, { isDeactivated: false }, { new: true });
  } catch (error) {
    throw error;
  }
};

const disconnectUser = async (userId) => {
  try {
    return await User.findByIdAndUpdate(userId, { isOnline: false }, { new: true });
  } catch (error) {
    throw error;
  }
};

const getUserByRole = async (role) => {
  try {
    // Récupérer les utilisateurs par rôle
    return await User.find({ role: role, isDeactivated: false, isDeleted: false });
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
  getUserByEmail,
  loginUser,
  deleteUser,
  deactivateAccount,
  disconnectUser,
  getUserByRole,
  activateAccount
};



