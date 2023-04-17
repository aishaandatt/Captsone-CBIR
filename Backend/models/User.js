const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

// Verify password
userSchema.methods.verifyPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw err;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;