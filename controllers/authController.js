const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const userModel = require('../models/userModel');

// Register user and send email notification
exports.register = async (req, res) => {
    const { username, phone, email, password, gender, location } = req.body;

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Save user to the database
        userModel.registerUser(username, phone, email, hashedPassword, gender, location, async (err, result) => {
            if (err) {
                console.error('User registration failed:', err);
                return res.redirect('/register?err=Registration failed');
            }

            console.log('User registered successfully:', result);

            // Send a welcome email to the registered user
            const url = 'https://mail-sender-api1.p.rapidapi.com/';
            const options = {
                method: 'POST',
                headers: {
                    'x-rapidapi-key': 'c61d2a41e6msha677143a858cee4p1bd26ejsn166a6ee3f3ef', // Your actual RapidAPI key
                    'x-rapidapi-host': 'mail-sender-api1.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sendto: email,
                    name: username,
                    replyTo: 'admin@go-mail.us.to',
                    ishtml: 'false',
                    title: 'Welcome to Our Story Generator Platform!',
                    body: `Hello ${username},\n\nThank you for registering! We're glad to have you on board.\n\nBest regards,\nYour Team`
                })
            };

            try {
                const response = await fetch(url, options);
                const responseText = await response.text();
                if (!response.ok) {
                    console.error(`Failed to send email. Status: ${response.status} Response: ${responseText}`);
                } else {
                    console.log('Email sent successfully:', responseText);
                }
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
            }

            // Redirect to login page after registration
            res.redirect('/login');
        });
    } catch (error) {
        console.error('Error in registration:', error);
        res.redirect('/register?err=Registration failed');
    }
};

// Login user
exports.login = (req, res) => {
    const { email, password } = req.body;

    userModel.getUserByEmail(email, (err, user) => {
        if (err || !user) {
            return res.redirect('/login?error=Invalid credentials');
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.redirect('/login?error=Invalid credentials');
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role,
            email: user.email,
            phone: user.phone,
        };

        req.session.save((err) => {
            if (err) {
                return res.redirect('/login?error=Session save failed');
            }
            res.redirect('/');
        });
    });
};

// Logout user
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
