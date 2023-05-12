

const express = require('express')

const authenticate = require("../middleware/authMiddleware.cjs");
const { registerUser, authUser, myCart, showMyCart, placeOrder, verifyPayment, removeItemFromCart, getMyOrders, logoutUser, forgotPassword, verifyEmail } = require("../controllers/userControllers.cjs")
const router = express.Router()


router.route('/signup').post(registerUser);
router.route('/verify/:verificationToken').get(verifyEmail);
router.route('/login').post(authUser);
router.route('/addcart/:id').post(authenticate, myCart);
router.route('/showMyCart').post(authenticate, showMyCart);
router.route('/removeItem/:id').post(authenticate, removeItemFromCart);
router.route('/orders').post(authenticate, placeOrder);
router.route('/verifyPayment').post(authenticate, verifyPayment);
router.route('/myorder').post(authenticate, getMyOrders);
router.route('/logout').post(authenticate, logoutUser);
router.route('/forgotPassword').post(forgotPassword);


module.exports = router;