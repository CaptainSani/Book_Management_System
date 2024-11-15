const express = require('express');
// const router = express.Router();
const User = require('../models/User');


const userController = {
  async getUsers(req, res) {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'User retrieval failed' });
    }
  },

  async getUserById(req, res) {
    try {
      const id = req.params.id;
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'User not found' });
    }
  },

  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const { name, email } = req.body;
      const result = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'User update failed' });
    }
  },

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      await pool.query('DELETE FROM users WHERE id = $1', [id]);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'User deletion failed' });
    }
  },
};

module.exports = userController;