const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const User = require('../models/User');

// Signup controller
exports.signup = async (req, res, next) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    try {
        const { name, email, password } = req.body;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        // Create and sign JWT token
        // const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET);
        const token = jwt.sign({ _id: newUser._id, email: newUser.email, isAdmin: newUser.isAdmin }, jwtSecret);
        // const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.status(201).json({ message: "User created", token, newUser });
        console.log(res)
    } catch (err) {
        res.status(500).json({ message: err.message });
        next(err);
    }
};

// Login controller
exports.login = async (req, res, next) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    try {
        // Check if user exists
        const { email, password } = req.body;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({ email: req.body.email });
        // console.log(req.user._id)
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if password is correct
        const passwordMatch = await user.verifyPassword(password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        // Create and sign JWT token
        // localStorage.setItem('userInfo', user)
        const token = jwt.sign({ _id: user._id, email: user.email, isAdmin: user.isAdmin }, jwtSecret);
        res.status(200).json({ message: "Login successful", token, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Logout controller
exports.logout = (req, res) => {
    // Clear JWT cookie
    res.clearCookie('token');

    res.json({ message: 'Logout successful' });
};
