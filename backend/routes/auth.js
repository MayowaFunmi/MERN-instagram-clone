const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const USER = mongoose.model("USER") // from models/model.js
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secrekKey = process.env.jwt_secret;

router.get('/', (req, res) => {
    res.send("hello")
})

router.post('/signup', (req, res) => {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
        res.status(422).json({ error: "All fields must be filled!" })
    }
    USER.findOne({ $or: [{ email: email }, { username: username }] }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "user with that email or username already exists." })
        }
        bcrypt.hash(password, 12).then((hashedpassword) => {
            const user = new USER({
                name,
                email,
                username,
                password: hashedpassword
            })
            user.save()
                .then(user => { res.status(200).json({ message: "data saved successfully", userData: user }) })
                .catch(err => { console.log(err) })
        })

    })

})

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email and/or password to login" })
    }
    USER.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Email addresss not found!" })
        }
        bcrypt.compare(password, savedUser.password)
            .then((match) => {
                if (match) {
                    //return res.status(200).json({ message: 'You are signed in successfully' })
                    const token = jwt.sign({ _id: savedUser.id }, secrekKey) // payload in requireLogin.js middleware
                        //console.log(token)
                    return res.status(200).json({ message: 'You are signed in successfully', token: token })
                        //res.json(token);
                } else {
                    return res.status(422).json({ error: 'Invalid password!!' })
                }
            })
            .catch(err => console.log(err))
    })
})
module.exports = router