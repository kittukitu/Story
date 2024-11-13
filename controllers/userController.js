// controllers/userController.js
exports.getStoryGenerator = (req, res) => {
    res.render('storyGenerator', { title: 'Story Generator', error: null, generatedStory: null });
  };
  
  exports.generateStory = (req, res) => {
    // Generate the story using the input
    const storyIdea = req.body.text;
    const generatedStory = `Generated story for: ${storyIdea}`;  // Placeholder for the actual generation logic
    res.render('storyGenerator', { title: 'Story Generator', generatedStory });
  };
  