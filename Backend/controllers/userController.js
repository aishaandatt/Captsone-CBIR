const User = require('../models/User');
const Product = require('../models/User')
require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../config');
const getUserByName = async (req, res) => {
    try {
        // Find the authenticated user

        const user = await User.findOne({ email: req.body });
        console.log(req.user.id)
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Return the name of the authenticated user as JSON
        res.json({ name: user.name, id: user.id, isAdmin: user.isAdmin });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateUserProfile = async (req, res) => {
    const { name, email, oldPassword, newPassword } = req.body;
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if the old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid old password' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.password = newPassword ? newPassword : user.password

        const updatedUser = await user.save();

        res.json(updatedUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
}
module.exports = { getUserByName, updateUserProfile };


