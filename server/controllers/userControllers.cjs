const User = require("./../../database/models/userModel.cjs");
const ProductInfo = require("./../../database/models/productModel.cjs");
const bcrypt = require("bcryptjs");
const Razorpay = require("razorpay");
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    const { name, email, password, repeatpassword } = req.body;
    if (!name || !email || !password || !repeatpassword) {
        res.status(400).json({ error: "fields can not be empty" });
        return; // added return statement to prevent further execution
    }
    try {
        const preuser = await User.findOne({ email: email });
        if (preuser) {
            res.status(400).json({ error: "user already exists" });
            return; // added return statement to prevent further execution
        }
        else if (password !== repeatpassword) {
            res.status(400).json({ error: "Password does not match" });
            return; // added return statement to prevent further execution
        }
        else {
            const finaluser = await User.create({
                name: name,
                email: email,
                password: password,
                verified: false
            });

            const verificationToken = jwt.sign({ email }, 'NIKS');


            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "youremailaddress",
                    pass: "yourpassord"
                }
            });

            const mailOption = {
                from: "youremailaddress",
                to: email,
                subject: "Verification Email",
                html: `<h1>Welcome</h1><p>Hi ${name}, You recentally register on the e-commerce website and this email is regarding to verify your email on Ecommerce website <br><br>
                <a href = "http://localhost:3000/user/verify/${verificationToken}">click here</a> to verify your email</p>`
            }

            await transporter.sendMail(mailOption);


            res.status(200).json(finaluser);

        }
    } catch (err) {
        console.log(err); // added error logging for debugging purposes
        res.status(400).json({ error: "something went wrong" });

    }
};


const verifyEmail = async (req, res) => {
    console.log("request comes here");
    const { verificationToken } = req.params;
    console.log("verification token: ", verificationToken)
    try {

        const decodedToken = jwt.verify(verificationToken, "NIKS");
        console.log("token: ", decodedToken);
        const user = await User.findOneAndUpdate({ email: decodedToken.email }, {
            $set: {
                verified: true
            }
        });
        if (user) {
            res.status(200).json("Email Verified");
        }
        else {
            res.status(400).json("Something went wrong");
        }

    } catch (err) {
        console.log(err);
        res.status(400).json("Something went wrong");

    }

}

const authUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json("Email and password are required.");
    }

    try {
        const userData = await User.findOne({ email: email });

        if (!userData) {
            return res.status(404).json("User not found.");
        }

        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(401).json("Invalid email or password.");
        }

        if (!userData.verified) {
            const verificationToken = jwt.sign({ email }, 'NIKS');


            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "nikhilverma20800@gmail.com",
                    pass: "mtcqvtejqoopiibl"
                }
            });

            const mailOption = {
                from: "nikhilverma@gmail.com",
                to: email,
                subject: "Verification Email",
                html: `<h1>Welcome</h1><p>Hi, You recentally register on the e-commerce website and this email is regarding to verify your email on Ecommerce website <br><br>
                <a href = "http://localhost:3000/user/verify/${verificationToken}">click here</a> to verify your email</p>`
            }

            await transporter.sendMail(mailOption);

            return res.status(401).json("Email is not verified. Please check your email.");
        }

        const token = await userData.generateAuthToken();

        res.status(200).json({ order: userData.orders, token, id: userData._id });
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal server error.");
    }
};


const myCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await ProductInfo.findOne({ id });
        const userDetail = await User.findOne({ _id: req.userID });

        // Check if the cart already contains the product
        const alreadyInCart = userDetail.cart.some(item => item._id.toString() === cart._id.toString());
        if (alreadyInCart) {
            res.status(400).json("Product already exists in cart");
            return;
        }

        if (userDetail) {
            const cartdata = await userDetail.addToCart(cart);
            res.status(200).json(userDetail);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};




const showMyCart = async (req, res) => {
    try {
        const buyer = await User.findOne({ _id: req.userID });
        if (!buyer) {
            res.status(400).json("Something went wrong");
        }
        else {
            res.status(200).json(buyer);

        }


    } catch (err) {
        console.log(err);
        res.status(400).json("server error");

    }

}

const placeOrder = async (req, res) => {
    const razorpay = new Razorpay({
        key_id: "rzp_test_LEk4Bbfdh3A1gs",
        key_secret: "WztqreXR71291WPS9K22Yorr",
    });
    const { amount } = req.body;

    const options = {
        amount: parseInt(amount) * 100, // amount should be in smallest currency unit
        currency: "INR",
    };

    try {
        const order = await razorpay.orders.create(options);
        console.log("main yha tu kha : ", order);
        return res.status(200).json({ order });
    } catch (err) {
        console.error("there: ", err);
        return res.status(400).json({ error: "Server error" });
    }
};


const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response;

        const text = `${razorpay_order_id}|${razorpay_payment_id}`;

        const expectedSignature = crypto
            .createHmac("sha256", "WztqreXR71291WPS9K22Yorr")
            .update(text.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            // After successfull payment verification move the data from user cart to user orders column;
            const user = await User.findOne({ _id: req.userID });
            const order = { items: user.cart, orderID: razorpay_order_id, paymentID: razorpay_payment_id, time: new Date() }; // Create an order object with the user's cart as items and the order ID
            await User.updateOne({ _id: req.userID }, { $push: { orders: order }, cart: [] });
            return res.status(200).json({ message: "Payment verified and order placed" });
        }
        else {
            return res.status(400).json({ error: "Payment not verified" });
        }
    } catch (err) {
        console.log("something went wrong: ", err);
        res.status(400).json("Server Error");

    }
};

const removeItemFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        req.rootUser.cart = req.rootUser.cart.filter((item) => {
            return item.id != id;
        })
        req.rootUser.save();
        res.status(200).json(req.rootUser);

    }
    catch (err) {
        console.log(err);
        res.status(400).json("Something went wrong");
    }

}

const getMyOrders = async (req, res) => {
    try {


        const data = await req.rootUser.orders;
        data.sort((a, b) => (b.time) - (a.time));


        if (!data) {
            res.status(400).json([]);
        }
        res.status(200).json(data);
    }
    catch (err) {
        console.log("something went wrong :", err);
        res.status(400).json("something went wrong");
    }

}

const logoutUser = async (req, res) => {
    try {

        req.rootUser.tokens = req.rootUser.tokens.filter((token) => {
            return token.token != req.token;

        });


        req.rootUser.save();
        res.status(200).json("Logged Out successfully");

    } catch (err) {
        console.log("userCOntroller 219: ", err);

        res.status(400).json("something went wrong")

    }

}

const forgotPassword = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json("Can not send empty data");
        return;
    }
    try {
        const Hpassword = await bcrypt.hash(password, 12);

        const user = await User.findOneAndUpdate({ email: email }, { password: Hpassword });
        if (user) {
            res.status(200).json("Password Changed");
        }
        else {
            res.status(400).json("User don't Exist");
        }


    } catch (err) {
        console.log(err);
        res.status(400).json("Something went wrong");

    }


}

module.exports = { registerUser, authUser, myCart, showMyCart, placeOrder, verifyPayment, removeItemFromCart, getMyOrders, logoutUser, forgotPassword, verifyEmail };
