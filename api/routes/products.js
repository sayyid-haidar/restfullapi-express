"use stric";
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/", (req, res, next) => {
  res.status(200).json({
    msg: "Stauts OK!"
  });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product
    .save()
    .then(result => console.log(result))
    .catch(err => console.log(err));

  res.status(200).json({
    msg: "/POST OK!",
    createProduct: product
  });
});

module.exports = router;
