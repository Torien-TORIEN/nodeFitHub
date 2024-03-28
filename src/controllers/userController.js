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
    const login = await userService.loginUser(email, motdepasse);
    res.json(login);
  } catch (error) {
    console.error(error);
    res.status(404).send({error : error.message});
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
