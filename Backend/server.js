// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require('cors');
require("dotenv").config();

// Create express app
const app = express();

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Define user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Define user model
const User = mongoose.model("User", userSchema);
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
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
}
// Define routes
app.get("/api/user", authenticateToken, async (req, res) => {
    try {
        // Find the authenticated user
        const user = await User.findOne({ email: req.user.email });
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Return the name of the authenticated user as JSON
        res.json({ name: user.name });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.post("/auth/signup", async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        await newUser.save();

        // Create and sign JWT token
        const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET);
        res.status(201).json({ message: "User created", token });
        console.log(res)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post("/auth/login", async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Create and sign JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.post('/logout', (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ message: 'Logout Successful' })
})

// Start server
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server listening on port ${process.env.PORT || 4000}`);
});
