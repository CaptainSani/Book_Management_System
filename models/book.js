const pool = require('../config/dbConfig')

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

   async createBook(title, author, userId) {
    const result = await pool.query(
      'INSERT INTO books (title, author) VALUES ($1, $2,) RETURNING *',
      [title, author]
    );
    return new Book(result.rows[0].id, title, author);
  }

   async getBookById(id) {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0] ? new Book(result.rows[0].id, result.rows[0].title, result.rows[0].author) : null;
  }
}

module.exports = Book;