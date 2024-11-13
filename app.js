const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const storyRoutes = require('./routes/storyRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
app.use('/', storyRoutes);
app.use('/', authRoutes); // Use the auth routes

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
