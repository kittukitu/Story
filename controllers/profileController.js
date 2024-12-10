const db = require('../config/db');

// Handle profile updates
exports.updateProfile = (req, res) => {
    const { username, phone, location, gender } = req.body;
    const email = req.session.user.email; // Email is assumed to be stored in session

    // Update user details in the database, excluding email and role
    const query = "UPDATE users SET username = ?, phone = ?, location = ?, gender = ? WHERE email = ?";
    db.query(query, [username, phone, location, gender, email], (err) => {
        if (err) {
            console.error("Error updating profile:", err);
            return res.status(500).send("An error occurred while updating profile.");
        }

        // Update session data
        req.session.user.username = username;
        req.session.user.phone = phone;
        req.session.user.location = location;
        req.session.user.gender = gender;

        // Redirect to profile page after a successful update
        res.redirect('/profile');
    });
};

// Fetch user profile details based on email (assuming email is stored in the session)
exports.getProfile = (req, res) => {
    if (!req.session.user || !req.session.user.email) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }

    const email = req.session.user.email;

    db.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email], (err, result) => {
        if (err) {
            console.error("Error retrieving user data:", err);
            return res.status(500).send("An error occurred while fetching profile data.");
        }
        if (result.length === 0) {
            return res.status(404).send("User not found.");
        }
        
        // Render the profile view with user data
        res.render('profile', { user: result[0] });
    });
};
