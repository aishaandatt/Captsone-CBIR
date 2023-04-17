const express = require('express');
const { authenticateUser } = require('../middleware/authMiddleware');
const { validateSignup, validateLogin } = require('../middleware/validationMiddleware');
const { signup, login, logout } = require('../controllers/authController');

const router = express.Router();
// const { getUser } = require('../controllers/userController');
// const authenticateToken = require('../middleware/authenticateToken');

// router.get('/user', authenticateToken, getUser);
router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/logout', authenticateUser, logout);

module.exports = router;
