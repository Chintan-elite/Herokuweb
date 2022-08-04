const mongoose = require("mongoose");


const CategorySchema = new mongoose.Schema({
    Category: String,

})


module.exports = mongoose.model("Category", CategorySchema);