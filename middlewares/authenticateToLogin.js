const { configDotenv } = require("dotenv");
const { validateToken } = require("../services/user");

function authenticateToken(req, res, next) {
    const token = req.cookies.token; // Assuming the token is stored in a cookie named 'token'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const user = validateToken(token,process.env.SECERET_KEY);

    if (!user) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = user; // Attach the user payload to the request object
    next();
}

module.exports={authenticateToken};