const secrekKey = process.env.jwt_secret;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const USER = mongoose.model("USER");

module.exports = (req, res, next) => {
    //console.log("hello middleware")
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You need to log in first" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, secrekKey, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "Please log in" })
        }
        const { _id } = payload
        USER.findById(_id).then(userData => {
            req.user = userData
            next()
        })
    })
}