const express = require("express");
const router = express.Router();
const { adminLogin, updateProduct, deleteProduct, addProduct } = require("../controllers/adminController.cjs");


router.route("/addProduct").post(addProduct);
router.route("/deleteProduct").post(deleteProduct);
router.route("/updateProduct").post(updateProduct);
router.route("/adminLogin").post(adminLogin);

module.exports = router;