const fetch = require('node-fetch');

exports.home = (req, res) => {
    const user = req.session.user || null; // Get the user from the session
    const error = null; // Default error
    const textInput = ''; // Default textInput
    const generatedStory = null; // Default generatedStory value
    res.render('index', { user, error, textInput, generatedStory }); // Pass variables to the template
};

exports.generateStory = async (req, res) => {
    const { text } = req.body;  // Capture the input text
    let error = null; // Initialize error as null

    // Check if there is no input text
    if (!text) {
        error = 'Please provide a story idea.';
        return res.render('index', { 
            error, 
            generatedStory: null, 
            textInput: text || '',  // Make sure to pass textInput as empty if no text is provided
            user: req.session.user 
        });
    }

    // Prepare the API request body
    const data = JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: text }]  // Send the user input as the message
    });

    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'your-api-key',  // Replace with your actual API key
            'x-rapidapi-host': 'your-api-host',  // Replace with the correct host
            'Content-Type': 'application/json'
        },
        body: data
    };

    try {
        // Send the request to the API
        const response = await fetch('https://your-api-endpoint-url.com/v1/chat/completions', options);
        const result = await response.json();

        // Check if the response has a valid generated story
        if (result && result.choices && result.choices[0].message.content) {
            // If successful, render the result with the generated story
            return res.render('index', {
                generatedStory: result.choices[0].message.content,
                textInput: text,  // Pass the input text back to the view
                error,  // Pass the error (which should be null if no error occurred)
                user: req.session.user
            });
        } else {
            // If there's no valid story, show an error message
            error = 'Story generation failed. Please try again.';
            return res.render('index', {
                generatedStory: null,
                textInput: text || '',
                error,
                user: req.session.user
            });
        }
    } catch (err) {
        // Handle any error that occurs during the API call
        console.error('Error during story generation:', err);
        error = 'An error occurred while generating the story.';
        return res.render('index', { 
            error, 
            generatedStory: null, 
            textInput: text,  // Ensure text input is passed back
            user: req.session.user 
        });
    }
};
