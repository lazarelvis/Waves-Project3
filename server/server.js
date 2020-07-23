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

//midleware -> bodyparser

//Models
const { User } = require("./models/user");

//Middleware
const { auth } = require("./middleware/auth");

//========== USER ===========

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    car: req.user.cart,
    history: req.user.history,
  });
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body); //middleware  is converting to json and get back

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  //find email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      //isMatch true sau false
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      //generate token

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
