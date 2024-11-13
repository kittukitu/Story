// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.get('/story-generator', ensureAuthenticated, userController.getStoryGenerator);
router.post('/generate-story', ensureAuthenticated, userController.generateStory);

module.exports = router;
