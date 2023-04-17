const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const productSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;