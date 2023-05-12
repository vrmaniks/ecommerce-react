const mongoose = require("mongoose");

const { Schema } = mongoose;
const productSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title:
    {
        type: String,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    image:
    {
        type: String
    },
    quantity:
    {
        type: Number

    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'Seller'
    }
})
const ProductInfo = mongoose.model('product', productSchema);
module.exports = ProductInfo;