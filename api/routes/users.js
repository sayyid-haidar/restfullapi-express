"use stric";
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const User = require("../models/user");
const url = process.env.URL + "user/";

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        username: req.body.username,
        password: hash
      });
      user
        .save()
        .then(user => {
          res.status(201).json({
            messege: "User has signup",
            signup: {
              _id: user._id,
              email: user.email,
              username: user.username,
              request: {
                type: "POST",
                url: url + "login"
              }
            }
          });
        })
        .catch(err => {
          // console.log(err.errmsg);
          res.status(500).json({
            messege: "Signup error",
            error: err
          });
        });
    }
  });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({ messege: "Auth faild" });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({ messege: "Auth failed" });
          } else if (result) {
            return res.status(200).json({ messege: "Auth successful" });
          } else {
            return res.status(401).json({ messege: "Auth failed" });
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        messege: "User deleted"
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// router.get("/", (req, res, next) => {});
// router.get("/:userId", (req, res, next) => {});
// router.petch("/:userId", (req, res, next) => {});

module.exports = router;
