const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, bookController.createBook);
router.get('/', authMiddleware, bookController.getBooks);
router.get('/:id', authMiddleware, bookController.getBookById);
router.put('/:id', authMiddleware, bookController.updateBook);
router.delete('/:id', authMiddleware, bookController.deleteBook);

module.exports = router;