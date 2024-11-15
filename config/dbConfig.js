const { Pool } = require('pg');
const env = require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,      
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,         
});

pool.query("SELECT NOW()", (err, res) => {
    if (err) {
      console.error("Error connecting to DB", err);
    } else {
      console.log("Connected to DB", res.rows);
    }
  });

  pool.query(
    `CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), password VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); `,
    (err, res) => {
      if (err) {
        console.error("Error creating table:", err);
      } else {
        console.log("Users Table created successfully");
      }
    }
  );

  pool.query(
    `CREATE TABLE IF NOT EXISTS books ( id SERIAL PRIMARY KEY, title VARCHAR(100), author VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); `,
    (err, res) => {
      if (err) {
        console.error("Error creating table:", err);
      } else {
        console.log("Books Table created successfully");
      }
    }
  );

module.exports = pool;