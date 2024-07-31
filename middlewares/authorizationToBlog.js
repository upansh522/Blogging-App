const jwt = require('jsonwebtoken');
const { validateToken } = require('../services/user');
require('dotenv').config();
const SECRET_KEY = process.env.SECERET_KEY; // Corrected typo

function authenticateToken(req, res, next) {
    const token = req.cookies.token; // Corrected from req.cookie to req.cookies
    if (!token) return res.status(401).json({ message: 'Token not found, please login' });

    const payload = validateToken(token, SECRET_KEY); // Pass the secret key for validation
    if (!payload) {
        console.error('JWT verification error');
        return res.status(403).json({ message: 'Invalid token' });
    }
    console.log("payload during authorization: ",payload);

    req.user = payload; // Assuming the payload contains the user info
    next();
}

module.exports = authenticateToken;
