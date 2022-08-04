const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const AdminSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    Tokens: [{
        token: {
            type: String
        }
    }]
})

AdminSchema.methods.generateAuthToken = async function () {
    try {

        const token = await jwt.sign({ _id: this._id }, "thisisregistrationsecretkey");
        this.Tokens = this.Tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }

}


module.exports = mongoose.model("Admin", AdminSchema);