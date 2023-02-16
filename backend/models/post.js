const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "image not available"
    },
    postedBy: {
        type: ObjectId,
        ref: "USER"
    }
})

mongoose.model("POST", postSchema);