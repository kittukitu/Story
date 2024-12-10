const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

// User dashboard route
router.get('/dashboard', ensureAuthenticated, userController.dashboard);

module.exports = router;
