const express = require('express');
const router = express.Router();
const { loginUser, getDashboard } = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/login', loginUser);
router.get('/dashboard', verifyToken, getDashboard);

router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    });
    return res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
