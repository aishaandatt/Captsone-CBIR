const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const User = require('../models/User');

// Authenticate user with JWT
exports.authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const decoded = jwt.verify(token, jwtSecret);

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        req.user = user;
        console.log(user)
        next();
    } catch (err) {
        next(err);
    }
};
