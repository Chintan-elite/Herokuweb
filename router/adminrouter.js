const { response } = require("express");
const express = require("express");
const { trusted } = require("mongoose");
const route = express.Router();
const Admin = require("../model/adminmodel")
const Category = require("../model/Category")
const Product = require("../model/Product")
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth")

route.get("/adminlogin", (req, resp) => {
    resp.render("adminlogin");
})

route.get("/dashboard", (req, resp) => {
    resp.render("dashboard");
})

route.post("/login-check", async (req, resp) => {

    const username = req.body.Username;
    const password = req.body.Password;

    const adminData = await Admin.findOne({ Username: username });
    // console.log(adminData.Password)

    const token = await adminData.generateAuthToken();

    resp.cookie("jwt", token, {
        expires: new Date(Date.now() + 300000),
        httpOnly: true
    });


    if (adminData.Password === password) {
        // console.log("done")
        resp.render("dashboard")
    }
    else {
        resp.render("adminlogin", { msg: "Invalid credencials" });
    }

})

route.get("/category", auth, (res, resp) => {
    resp.render("category");
    resp.redirect("viewCategory")
})


route.post("/addCategory", async (req, resp) => {

    const _id = req.body.id;
    if (_id === "") {
        try {
            const category = new Category(req.body);
            const result = await category.save();
            resp.redirect("viewCategory")

        } catch (error) {
            console.log(error)
        }
    }
    else {
        const result = await Category.findByIdAndUpdate(_id, req.body);
        resp.redirect("viewCategory")
    }

})

route.get("/viewCategory", async (req, resp) => {
    try {
        const result = await Category.find();
        resp.render("category", { data: result })
    } catch (error) {
        console.log(error)
    }
})

route.get("/deleteCategory", async (req, resp) => {
    const _id = req.query.did;
    try {
        const result = await Category.findByIdAndDelete(_id);
        resp.redirect("viewCategory")
    } catch (error) {
        console.log(error)
    }

})

route.get("/editCategory", async (req, resp) => {
    const _id = req.query.uid;
    try {
        const result = await Category.findById(_id);
        const alldata = await Category.find();
        resp.render("category", { udata: result, data: alldata })
    } catch (error) {

    }
})

//*********************Product******************************** 

route.get("/product", async (req, resp) => {

    try {
        const result = await Category.find();
        console.log(result)
        resp.render("product", { cdata: result })
    } catch (error) {
        console.log(error)
    }

})

var Storage = multer.diskStorage({
    destination: "./public/productImage",
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

var upload = multer({
    storage: Storage
}).single("file");


route.post("/addProduct", upload, async (req, resp) => {

    const product = new Product({
        catId: req.body.catId,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        qty: req.body.qty,
        imagePath: path.join(__dirname, `../public/productImage`),
        image: req.file.filename
    })

    try {
        const result = await product.save();
        resp.redirect("product")
    } catch (error) {
        console.log(error)
    }

})

route.get("/viewProduct", auth, async (req, resp) => {
    try {
        const product = await Product.find();
        resp.json(product);
    } catch (error) {
        resp.send(error)
    }
})



module.exports = route;