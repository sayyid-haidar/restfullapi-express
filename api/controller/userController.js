"use stric";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const url = process.env.URL + "user/";

exports.Signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
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
};

exports.Login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      console.log(user);
      if (user.length < 1) {
        return res.status(401).json({ messege: "Auth faild" });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({ messege: "Auth failed" });
          } else if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              messege: "Auth successful",
              token: token
            });
          } else {
            return res.status(401).json({ messege: "Auth failed" });
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.DeleteUser = (req, res, next) => {
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
};
