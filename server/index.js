const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { User } = require("./models/user");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb://localhost:27017/Session", {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromBodyField("t");
opts.secretOrKey = "qwe123qwe123";
passport.use(
  new JwtStrategy(opts, async function(jwt_payload, done) {
    console.log(jwt_payload);
    await User.findOne({ _id: jwt_payload._id }, function(err, user) {
      if (err) {
        console.log(err);
        return done(err, false);
      }
      if (user) {
        // console.log("here?");
        return done(null, user);
      } else {
        // console.log("hereit is");
        return done("signupboi", false);
      }
    });
  })
);

app.post("/signup", (req, res) => {
  user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save().then(
    data => {
      var token = jwt.sign({ _id: data._id }, "qwe123qwe123");
      res.send({
        sucess: true,
        t: token,
        email: data.email
      });
    },
    err => {
      console.log(err);
    }
  );
});

app.post(
  "/login",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({ sucess: true, _id: req.user._id, email: req.user.email });
  }
);

app.listen(3002, () => {
  console.log("Srver is running on localhost:3002");
});
