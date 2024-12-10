const bcrypt = require('bcrypt');
const db = require('../config/db');
const fetch = require('node-fetch');

// Register logic
exports.register = async (req, res) => {
    const { username, phone, email, password, gender, location } = req.body;

    try {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) return res.redirect('/register?error=Registration failed');
            if (results.length > 0) return res.redirect('/register?error=Email already in use');

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                'INSERT INTO users (username, phone, email, password, gender, location, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [username, phone, email, hashedPassword, gender, location, 'user'],
                async (insertErr) => {
                    if (insertErr) return res.redirect('/register?error=Registration failed');

                    // Send welcome email
                    const emailBody = { sendto: email, name: username, replyTo: 'admin@platform.com', ishtml: false, title: 'Welcome!', body: `Hi ${username}, Welcome!` };
                    try {
                        const response = await fetch('https://mail-sender-api1.p.rapidapi.com/', {
                            method: 'POST',
                            headers: {
                                'x-rapidapi-key': 'your-rapidapi-key',
                                'x-rapidapi-host': 'mail-sender-api1.p.rapidapi.com',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(emailBody),
                        });
                        if (!response.ok) console.error('Failed to send email');
                    } catch (emailError) {
                        console.error('Email error:', emailError);
                    }

                    res.redirect('/login');
                }
            );
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.redirect('/register?error=Registration failed');
    }
};

// Login logic
exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.redirect('/login?error=Invalid credentials');
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.redirect('/login?error=Invalid credentials');
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };
        return res.redirect('/generator');
    });
};

// Logout logic (controller function)
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
