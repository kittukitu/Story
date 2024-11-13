const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const storyController = require('../controllers/storyController');

// Authentication Routes
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', authController.login);

router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', authController.register);

router.post('/logout', authController.logout);

// Story Generation Routes
router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('index', { error: null, generatedStory: null, textInput: '' });
});
router.post('/generate-story', storyController.generateStory);

module.exports = router;
