const ProductInfo = require("../../database/models/productModel.cjs");


const getProducts = async (req, res) => {

    ProductInfo.find()
        .skip(parseInt(req.query.skip))
        .limit(parseInt(5))
        .then((data) => {
            res.status(200).send(data);
        })
}


const viewProducts = async (req, res) => {
    try {
        const { id } = req.params;
        ProductInfo.findOne({ id: id }).then((data) => {
            res.status(200).json(data);
        })

    }
    catch (err) {
        res.status(400).send("server error");
    }
}

module.exports = {getProducts,viewProducts};