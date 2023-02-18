const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const requireLogin = require('../middleware/requireLogin');
const POST = mongoose.model("POST")
    // route

router.get("/allposts", requireLogin, (req, res) => {
    POST.find()
        .populate('postedBy')
        .then(posts => res.json(posts))
        .catch(err => console.log())
})


router.post("/createPost", requireLogin, async(req, res) => {
    const { title, body, photo } = req.body;
    if (!title || !body || !photo) {
        return res.status(422).json({ error: "All fields are required" })
    }
    //console.log("user = ", req.user)
    const post = new POST({
        title,
        body,
        photo: photo,
        postedBy: req.user
    })
    await post.save().then((result) => {
        return res.status(200).json({ message: "Post created successfully", post: result })
    }).catch(err => console.log(err))
})

module.exports = router