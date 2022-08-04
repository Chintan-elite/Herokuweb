const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config()
const PORT = process.env.PORT

const viewPath = path.join(__dirname, "../templetes/views");
const partialPath = path.join(__dirname, "../templetes/partials");
const publicPath = path.join(__dirname, "../public");
//console.log(viewPath);
app.use(bodyParser.urlencoded({ extended: false }))
app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(publicPath))
hbs.registerPartials(partialPath);
app.use(express.json())

const userrouter = require("../router/userrouter");
app.use("/", userrouter)

const adminrouter = require("../router/adminrouter");
app.use("/", adminrouter)



mongoose.connect("mongodb://127.0.0.1:27017/E-shop").then(() => {
    console.log("Db connected successfully !!!  ")
}).catch(err => {
    console.log(err);
})

app.listen(PORT, (req, resp) => {
    console.log("Server running on port " + PORT);
})