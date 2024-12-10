const db = require('../config/db');

// Function to fetch all users
exports.getAllUsers = (req, res) => {
    db.query('SELECT id, username, email, phone, location, gender, role FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).send('Internal server error');
        }
        res.render('admin/users', { users: results, user: req.session.user });
    });
};
