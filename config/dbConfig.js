const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',      
    host: 'localhost',
    database: 'BookManagementSystem',
    password: '1234567890',
    port: 5432,         
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
        console.log("Table created successfully");
      }
    }
  );

  pool.query(
    `CREATE TABLE IF NOT EXISTS books ( id SERIAL PRIMARY KEY, title VARCHAR(100), author VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); `,
    (err, res) => {
      if (err) {
        console.error("Error creating table:", err);
      } else {
        console.log("Table created successfully");
      }
    }
  );

module.exports = pool;