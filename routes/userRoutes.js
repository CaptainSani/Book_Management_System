const express = require('express');
const router = express.Router();
const profileController = require('../controller/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, profileController.getProfile);
router.put('/', authMiddleware, profileController.updateProfile);
router.delete('/', authMiddleware, profileController.deleteProfile);

module.exports = router;