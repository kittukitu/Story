const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const editProfileController = require('../controllers/editProfileController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

// Display login page
router.get('/login', (req, res) => {
    res.render('login', { error: req.query.error || '' });
});

// Handle login logic
router.post('/login', authController.login);

// Register routes
router.get('/register', (req, res) => res.render('register'));
router.post('/register', authController.register);

// Logout route
router.post('/logout', authController.logout);

// Profile routes
router.get('/profile', ensureAuthenticated, profileController.getProfile);

// Edit Profile routes
router.get('/edit-profile', ensureAuthenticated, (req, res) => {
    res.render('edit-profile', { user: req.session.user });
});
router.post('/edit-profile', ensureAuthenticated, editProfileController.updateProfile);

module.exports = router;
