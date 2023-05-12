const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const key = "NIKS";  //these are credentials and i do not recommend you to access these like i did you should always maintain these things in the .env files that is a more better and professional approach.
const options = {
    expiresIn: '5h'
};

const { Schema } = mongoose;
mongoose.set("strictQuery", true);

const userschema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Added to ensure that email is unique
    },
    password: {
        type: String,
        required: true
    },
    verified: { // Corrected the spelling to "verified"
        type: Boolean
    },
    cart: {
        type: Array
    },
    orders: {
        type: Array,

    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

// Added an async function to handle errors in the pre-save hook
userschema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 12);
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Token generation process
userschema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, key, options);
        if (this.tokens.length > 0) {
            this.tokens.splice(0, 1); //this i did to store only one token inside the token array.
        }
        this.tokens.push({ token }); //firstly remove the old token then push the new generated token;
        await this.save();
        return token;
    } catch (error) {
        console.log("error generating token");
        console.log(error);
    }
};



//add data to cart:
userschema.methods.addToCart = async function (cart) {
    try {
        this.cart.push(cart);
        await this.save();
        return this.cart;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const Userdata = mongoose.model('info', userschema);

module.exports = Userdata;
