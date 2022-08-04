const express = require("express");
const { trusted } = require("mongoose");
const route = express.Router();
const Category = require("../model/Category")
const Product = require("../model/Product")

route.get("/", async (req, resp) => {

    try {

        const category = await Category.find();
        const product = await Product.find();
        resp.render("index", { category, product });
    } catch (error) {
        console.log(error)
    }

})

route.get("/index", (req, resp) => {
    resp.render("index");
})

route.get("/contact", (req, resp) => {
    resp.render("contact");
})

route.get("/cart", (req, resp) => {
    resp.render("cart");
})

route.get("/checkout", (req, resp) => {
    resp.render("checkout");
})

route.get("/shop", (req, resp) => {
    resp.render("shop");
})

route.get("/detail", (req, resp) => {
    resp.render("detail");
})

route.get("/registration", (req, resp) => {
    resp.render("registration");
})

route.get("/login", (req, resp) => {
    resp.render("login");
})







module.exports = route;