const User = require('../models/User');
const Product = require('../models/Product')
require("dotenv").config();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    }
    catch (err) {
        console.log(err)
    }
}
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        await User.deleteOne({ _id: id })
        res.status(200).json({ message: 'User Deleted Successfully' })
    }
    catch (error) {
        console.log(error)
    }
}
const deleteProduct = async (req, res) => {
    const id = req.params.id
    const resp = await Product.deleteOne({ _id: id })
    console.log(resp)
    res.status(200).json({ message: "Product Delete Successfully" })
}

const editProduct = async (req, res) => {
    console.log('edit')
    const { image, name, breed, description, age, category } = req.body
    const { id } = req.params
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" })
        }
        console.log(product)
        product.image = image || product.image
        product.name = name || product.name
        product.breed = breed || product.breed
        product.description = description || product.description
        product.age = age || product.age
        product.category = category || product.category


        const updateProduct = await product.save()
        res.json(updateProduct)
    }
    catch (err) {
        console.log(err.message)
        res.json(err)
    }
}
module.exports = { getAllUsers, deleteUser, deleteProduct, editProduct };
