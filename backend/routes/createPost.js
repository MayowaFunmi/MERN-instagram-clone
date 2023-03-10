const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const requireLogin = require('../middleware/requireLogin');
const POST = mongoose.model("POST")
    // route

router.get("/allposts", requireLogin, (req, res) => {
    POST.find()
        .populate('postedBy')
        .populate("comments.postedBy", "_id name email createdAt updatedAt")
        .sort("-createdAt")
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

router.get("/myposts", requireLogin, (req, res) => {
    //console.log(req.user)
    POST.find({ postedBy: req.user._id })
        .populate('postedBy', '_id name username email createdAt updatedAt ')
        .populate("likes")
        .populate("comments.postedBy", "_id name email")
        .then(myposts => {
            res.json(myposts)
        })
})

router.put('/like', requireLogin, (req, res) => {
    //console.log(req.body)
    POST.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.user._id }
        }, {
            new: true
        })
        .populate("postedBy")
        .populate("likes")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.status(200).json(result)
            }
        })
})

router.put('/unlike', requireLogin, (req, res) => {
    console.log(req.body)
    POST.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.user._id }
        }, {
            new: true
        })
        .populate("postedBy")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.status(200).json(result)
            }
        })
})

router.put('/comment', requireLogin, (req, res) => {
    const comment = {
        comment: req.body.text,
        postedBy: req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId, {
            $push: { comments: comment }
        }, {
            new: true
        })
        .populate("comments.postedBy", '_id name email createdAt, updatedAt')
        .populate("postedBy", '_id name email createdAt, updatedAt')
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                return res.status(200).json({ result, message: 'Your comment has been posted successfully!' })
            }
        })
})

// API to delete posts
router.delete("/deletePost/:postId", requireLogin, (req, res) => {
    POST.findOne({ _id: req.params.postId })
        .populate('postedBy', '_id')
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        return res.status(200).json({ message: "Post deleted successfully" })
                    })
                    .catch((err) => {
                        return res.status(200).json({ error: err })
                    })
            }
        })
})
module.exports = router