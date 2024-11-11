const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const user = await User.getUserById(userId);
  res.json(user);
});

router.put('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { name, email, password } = req.body;
  const user = await User.updateUser(userId, name, email, password);
  res.json(user);
});

router.delete('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  await User.deleteUser(userId);
  res.json({ message: 'Profile deleted successfully' });
});