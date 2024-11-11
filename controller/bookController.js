const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { title, author } = req.body;
  const book = await Book.createBook(title, author, userId);
  res.json(book);
});

router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const books = await Book.getBooksByUser(userId);
  res.json(books);
});

router.get('/:id', authMiddleware, async (req, res) => {
  const bookId = req.params.id;
  const book = await Book.getBookById(bookId);
  res.json(book);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const bookId = req.params.id;
  const { title, author } = req.body;
  const book = await Book.updateBook(bookId, title, author);
  res.json(book);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const bookId = req.params.id;
  await Book.deleteBook(bookId);
  res.json({ message: 'Book deleted successfully' });
});