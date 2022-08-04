const mongoose = require("mongoose");


const productScema = new mongoose.Schema({

    catId: Object,
    productName: String,
    productPrice: Number,
    qty: Number,
    imagePath: String,
    image: String


})

module.exports = mongoose.model("Product", productScema)