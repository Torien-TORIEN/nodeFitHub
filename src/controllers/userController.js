const userService = require('../services/userService');

// Contrôleur pour ajouter un nouvel utilisateur
const addUser = async (req, res, next) => {
  //console.log(`Adding user ...`)
  try {
    const user = req.body; // Supposons que les données de l'utilisateur sont envoyées dans le corps de la requête
    const newUser = await userService.addUser(user);
    res.status(201).json({ success: true, data:newUser, message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error:error.message, message: 'Failed to create an user ' });
  }
};

// Contrôleur pour mettre à jour un utilisateur existant
const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id; // Supposons que l'ID de l'utilisateur soit extrait des paramètres de la requête
    const user = req.body; // Les nouvelles données de l'utilisateur à mettre à jour
    const updatedUser = await userService.updateUser(userId, user);
    res.status(200).json({ success: true, data:updatedUser, message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error:error.message, message: 'Failed to update an user' });
  }
};

// Contrôleur pour mettre à jour le mot de passe d'un utilisateur
const updateUserPassword = async (req, res, next) => {
  try {
    const userId = req.params.id; // Supposons que l'ID de l'utilisateur soit extrait des paramètres de la requête
    const newPassword = req.body.password; // Le nouveau mot de passe à définir
    const updatedUser = await userService.updateUserPassword(userId, newPassword);
    res.json(updatedUser);
    res.status(200).json({ success: true, data:updatedUser, message: 'User password updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error:error.message, message: 'Failed to update an user password' });
  }
};

// Contrôleur pour récupérer tous les utilisateurs
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, data: users, message: 'Retrieved all users successfully'});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to retrieve users' });
  }
};
// Contrôleur pour récupérer un utilisateur par son ID
const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log("get user by id ...")
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'No User  Found with that id', message: 'User Not Found' });
    }
    res.status(200).json({ success: true, data: user, message: 'Found user' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to find an user' });
  }
};

// Contrôleur pour récupérer un utilisateur par son email
const getUserByEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, error: 'No User  Found with that email', message: 'User Not Found' });
    }
    res.status(200).json({ success: true, data: user, message: 'Found user' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to find an user by email' });
  }
};

// Contrôleur pour authentifier un utilisateur
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("login ... ")
    const { token, user } = await userService.loginUser(email, password);
    res.status(200).json({ success: true, user: user, token: token , message: 'Authenticated successfully' });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message, message: 'Failed to connect' });
  }
};

// Contrôleur pour récupérer les utilisateurs par rôle
const getUserByRole = async (req, res, next) => {
  try {
    const role = req.params.role; // Supposons que le rôle est passé en tant que paramètre dans l'URL
    const users = await userService.getUserByRole(role);
    res.status(200).json({ success: true, data: users, message: 'Retrieved users by role successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to retrieve users by role' });
  }
};

// Contrôleur pour supprimer un utilisateur (soft delete)
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userService.deleteUser(userId);
    res.status(200).json({ success: true, data: deletedUser, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to delete user' });
  }
};

// Contrôleur pour désactiver un compte utilisateur
const deactivateAccount = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deactivatedUser = await userService.deactivateAccount(userId);
    res.status(200).json({ success: true, data: deactivatedUser, message: 'Account deactivated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to deactivate account' });
  }
};

// Contrôleur pour désactiver un compte utilisateur
const activateAccount = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deactivatedUser = await userService.activateAccount(userId);
    res.status(200).json({ success: true, data: deactivatedUser, message: 'Account activated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to activate account' });
  }
};

// Contrôleur pour déconnecter un utilisateur
const disconnectUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log("disconnecting user ... ");
    const disconnectedUser = await userService.disconnectUser(userId);
    res.status(200).json({ success: true, data: disconnectedUser, message: 'User disconnected successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to disconnect user' });
  }
};

// Contrôleur pour ajouter une activité à un utilisateur
const addActivity = async (req, res, next) => {
  try {
    const { activityId, userId } = req.body;
    console.log("adding Activity to user ...")
    const updatedUser = await userService.addUserActivity(activityId, userId);
    res.status(200).json({ success: true, data: updatedUser, message: 'Activity added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to add activity to user' });
  }
};

// Contrôleur pour supprimer une activité d'un utilisateur
const removeActivity = async (req, res, next) => {
  try {
    console.log("removing Activity from user ...")
    const { activityId, userId } = req.body;
    const updatedUser = await userService.removeUserActivity(activityId, userId);
    res.status(200).json({ success: true, data: updatedUser, message: 'Activity removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to remove activity from user' });
  }
};

// Contrôleur pour abonner un utilisateur à une offre
const subscribe = async (req, res, next) => {
  try {
    const { offerId, userId } = req.body;
    console.log("subscribing ...")
    const updatedUser = await userService.subscribe(offerId, userId);
    res.status(200).json({ success: true, data: updatedUser, message: 'User subscribed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to subscribe user to offer' });
  }
};

// Contrôleur pour désabonner un utilisateur
const unsubscribe = async (req, res, next) => {
  try {
    const { userId } = req.params.userId;
    console.log("unsubscribing ...")
    const updatedUser = await userService.unsubscribe(userId);
    res.status(200).json({ success: true, data: updatedUser, message: 'User unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to unsubscribe user' });
  }
};

// Contrôleur pour récupérer les activités d'un utilisateur
const getUserActivities = async (req, res, next) => {
  try {
    const userId = req.params.id; // Supposons que l'ID de l'utilisateur soit extrait des paramètres de la requête
    console.log("Get user activities ...")
    const activities = await userService.getUserActivities(userId);
    res.status(200).json({ success: true, data: activities, message: 'Retrieved user activities successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to retrieve user activities' });
    console.log("Get user activities error :"+ error.message)
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
  getUserByRole,
  deleteUser,
  deactivateAccount,
  activateAccount,
  disconnectUser,
  addActivity,
  removeActivity,
  subscribe,
  unsubscribe,
  getUserActivities,
};
