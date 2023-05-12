const express = require('express');
const { getProducts } = require("../controllers/productControllers.cjs");
const { viewProducts } = require("../controllers/productControllers.cjs")
const router = express.Router()

router.route('/products').get(getProducts);
router.route("/viewProduct/:id").get(viewProducts);



module.exports = router;