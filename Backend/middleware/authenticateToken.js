const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const User = require('../models/User');
require("dotenv").config();
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};
const admin = (req, res, next) => {
    // console.log(req.user, req.user.isAdmin)
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(403)
        throw new Error('Not authorized as admin.')
    }
}
// const fetchtoken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Forbidden' });
//         }

//         req.user = { _id: decoded._id };
//         next();
//     });
// }
// const auth = async (req, res, next) => {
//     let token

//     if (req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         try {
//             token = req.headers.authorization.split(' ')[1]

//             const decoded = jwt.verify(token, process.env.JWT_SECRET)

//             req.user = await User.findById(decoded._id)
//             console.log(decoded.id)
//             next()
//         } catch (error) {
//             console.error(error)
//             res.status.apply(401)
//             throw new Error('Not Authorized, Token Failed')
//         }
//     }

//     if (!token) {
//         res.status(401)
//         throw new Error('Not Authorized, No Token')
//     }
// };
module.exports = { authenticateToken, admin };

