const jwt = require("jsonwebtoken");
const User = require("./../../database/models/userModel.cjs");

const authenticate = async (req, res, next) => {
    try {
        console.log("request for athentication");
        const token = req.body.token;
        const verifyToken = jwt.verify(token, "NIKS"); //NIKS is the secret key it is recommended to store credentials in the .env file i know it but i did not use it here.

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) {
            throw new Error("Invalid Token");
        }

        console.log("user athenticated");

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (err) {
        console.log("Error from middleware: ", err);
        res.status(400).json({ error: "Not authorized" });
    }
};

module.exports = authenticate;
