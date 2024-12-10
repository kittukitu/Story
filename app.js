const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set to true if using HTTPS
    })
);

// Middleware to make `user` available in all templates
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers
const authRoutes = require('./routes/authRoutes'); // Auth routes
const userRoutes = require('./routes/userRoutes'); // User routes
const adminRoutes = require('./routes/adminRoutes'); // Admin routes
const indexRoutes = require('./routes/indexRoutes'); // Index page route
const storyRoutes = require('./routes/storyRoutes'); // Story routes

// Default route (redirect to login if not logged in)
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/index');  // Redirect to the index if already logged in
    } else {
        res.redirect('/login');  // Redirect to login page if not logged in
    }
});

// Apply routes
app.use(authRoutes);  // Authentication routes (e.g., login, register)
app.use(userRoutes);  // User-specific routes
app.use('/admin', adminRoutes);  // Admin routes (with /admin prefix)
app.use(storyRoutes);  // Story generation routes
app.use(indexRoutes);  // Index page route (landing page)

// /generator route for authenticated users
app.get('/generator', (req, res) => {
    if (req.session.user) {
        res.render('generator', { user: req.session.user });
    } else {
        res.redirect('/login?error=Please log in first');
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
