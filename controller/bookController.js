const pool = require("../config/dbConfig");


const bookController = {
  createBook: async (req, res) => {
    try {
      const { title, author } = req.body;
      const result = await pool.query(
        'INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *',
        [title, author, description]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Book creation failed' });
    }
  },

  getBooks: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM books');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Book retrieval failed' });
    }
  },

  getBookById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Book not found' });
    }
  },

  updateBook: async (req, res) => {
    try {
      const id = req.params.id;
      const { title, author } = req.body;
      const result = await pool.query(
        'UPDATE books SET title = $1, author = $2 WHERE id = $4 RETURNING *',
        [title, author, id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Book update failed' });
    }
  },

  deleteBook: async (req, res) => {
    try {
      const id = req.params.id;
      await pool.query('DELETE FROM books WHERE id = $1', [id]);
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Book deletion failed' });
    }
  },
};

module.exports = bookController;