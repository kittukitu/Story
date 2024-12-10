const express = require('express');
const router = express.Router();

// Handle GET request to show the generator form
router.get('/generator', (req, res) => {
    const textInput = req.query.text || '';  // Initialize textInput (could also be req.body.text)
    res.render('generator', { textInput });
});

// Handle POST request to process the generator form
router.post('/generator', (req, res) => {
    const textInput = req.body.text;  // Get the submitted text input
    
    if (!textInput || textInput.trim() === '') {
        const error = "Please enter a valid story idea.";
        return res.render('generator', { error, textInput });  // Pass error and textInput
    }

    res.render('generator', { textInput });  // If no error, just pass textInput
});

module.exports = router;
