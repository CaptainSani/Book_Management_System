const pool = require('../config/dbConfig');
const bcrypt = require('bcrypt');

class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    return new User(result.rows[0].id, name, email, hashedPassword);
  }

  static async getUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] ? new User(result.rows[0].id, result.rows[0].name, result.rows[0].email, result.rows[0].password) : null;
  }
}

module.exports = User;