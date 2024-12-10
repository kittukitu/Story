const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'mern'
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
        process.exit(1); // Exit process on failure
    } else {
        console.log('Connected to MySQL Database');
    }
});

module.exports = db;
