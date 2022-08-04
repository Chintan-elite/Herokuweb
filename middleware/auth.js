const jwt = require("jsonwebtoken")
const Admin = require("../model/adminmodel")
const cookieParser = require('cookie-parser')

const auth = async (req, resp, next) => {

    try {
        const token = req.cookies.jwt;
        const verified = await jwt.verify(token, "thisisregistrationsecretkey");

        const admin = await Admin.findById({ _id: verified._id });

        req.admin = admin;
        req.token = token;

        next();

    } catch (error) {
        resp.render("adminlogin", { "msg": "Please Login first !!!" });
    }
}

module.exports = auth;