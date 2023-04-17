const User = require('../models/User');
const Product = require('../models/Product')
require("dotenv").config();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const addProduct = async (req, res) => {
    try {
        const { image, name, breed, description, age, category } = req.body;
        // const user = req.user._id;

        const product = new Product({
            image,
            name,
            breed,
            description,
            age,
            category
            // user,
        });

        await product.save();

        res.json(product);
    } catch (err) {
        console.error('erree', err.message);
        res.status(500).send('Server error');
    }
};
const productFetch = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

}
//Add Edit and Delete Product

module.exports = { productFetch, addProduct };