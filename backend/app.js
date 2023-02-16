const express = require('express');
const app = express()
const mongoose = require('mongoose')
require("dotenv").config();
const cors = require('cors')
const bodyParser = require('body-parser');
require('./models/model');
require('./models/post');

const auth = require('./routes/auth')
const post = require('./routes/createPost');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());
app.use(auth)
app.use(post)


const uri = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to database"))
    .catch((error) => console.log(error.message));
//insta_mayor
//mayowainstagram