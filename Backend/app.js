const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes')
const { handleError } = require('./middleware/errorMiddleware');
const { mongoURI } = require('./config');
const fs = require('fs')
const cors = require('cors');
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// Routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/admin', adminRoutes)
// Error handling middleware
app.use(handleError);

// Connect to MongoDB
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });


// Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
}).single('myImage');

// Set static folder

app.post('/upload', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 60 * 60 * 24 * 30);
    upload(req, res, err => {
        if (err) {
            console.log(err);
        } else {
            console.log(req.file);
            res.send(req.file);
        }
    });
});
app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);
    res.sendFile(filePath);
});
app.delete('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'public/uploads', filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting file');
        } else {
            console.log(`File ${filename} has been deleted`);
            res.status(200).send('File deleted successfully');
        }
    });
});
// Start the server
app.listen(4000, () => {
    console.log('Server started on port 4000');
});
