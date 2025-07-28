require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../config/testimonialsDb');

const SECRET_KEY = process.env.SECRET_KEY;

const loginUser = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM admin_users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ message: 'DB error', err });

        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });

        return res.status(200).json({ message: 'Login successful' });
    });
};

const getDashboard = (req, res) => {
    res.json({ message: `Welcome, ${req.user.email}` });
};

module.exports = { loginUser, getDashboard };
