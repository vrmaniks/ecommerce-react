const ProductInfo = require("./../../database/models/productModel.cjs");
const bcrypt = require("bcryptjs");
const Admin = require("../../database/models/adminModel.cjs");


const addProduct = async (req, res) => {

}
const deleteProduct = async (req, res) => {

}
const updateProduct = async (req, res) => {

}
const adminLogin = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json("Fields can not be empty");

    }
    const admin = await Admin.find({ email: email });
    if (!admin) {
        res.status(400).json("User not found");
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        res.status(400).json("Invalid Email or Password");
    }
    else {
        res.status(200).json("Welcome Admin");
    }


};

module.exports = { addProduct, deleteProduct, updateProduct, adminLogin };