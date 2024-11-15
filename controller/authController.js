const jwt = require('jsonwebtoken');
const User = require('../models/User');
const  env = require('dotenv').config(); 

const authController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }

      const user = await User.createUser(name, email, password);
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Registration failed' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }

      const user = await User.loginUser(email, password);
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Invalid email or password' });
    }
  },
};

module.exports = authController;