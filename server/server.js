const express = require("express"); //crud operations
const bodyParser = require("body-parser"); //get information from request
const cookieParser = require("cookie-parser"); //read cookie when get a request

const app = express();
const mongoose = require("mongoose"); //object modeling for node.js OMT
require("dotenv").config(); //by "dotenv": "^6.0.0"

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Models

const { User } = require("./models/user.js");

//========== USER ===========

app.post("api/users/register", (req, res) => {
  const user = new User(req.body); //body from postman?

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      userdata: doc,
    });
  });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
