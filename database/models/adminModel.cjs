
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const adminSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    aadhaar: {
        type: String
    },
    GSTIN: {
        type: String
    },
    panNumer: {
        type: String
    }
});

adminSchema.pre("save", async (next) => {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 12);
        }
        next();
    } catch (error) {
        next(error);
    }

});

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
