const fetch = require('node-fetch');

exports.generateStory = async (req, res) => {
    const { text } = req.body; 

    let error = null;

    if (!text) {
        error = 'Please provide a story idea.';
        return res.render('index', { error, generatedStory: null, textInput: text || '' });
    }

    const data = JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: text }]
    });

    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'c61d2a41e6msha677143a858cee4p1bd26ejsn166a6ee3f3ef',
            'x-rapidapi-host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: data
    };

    try {
        const response = await fetch('https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions', options);
        const result = await response.json();

        if (result && result.choices && result.choices[0].message.content) {
            return res.render('index', {
                generatedStory: result.choices[0].message.content,
                textInput: text || '',
                error
            });
        } else {
            error = 'Story generation failed. Please try again.';
            return res.render('index', { error, generatedStory: null, textInput: text || '' });
        }
    } catch (error) {
        console.error('Error during story generation:', error);
        error = 'An error occurred while generating the story.';
        return res.render('index', { error, generatedStory: null, textInput: text || '' });
    }
};
