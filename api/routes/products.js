"use stric";
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => res.status(200).json(docs))
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ msg: "Not found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
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
    .then(result => {
      res.status(200).json({
        msg: "method /POST to /Product Done!",
        createProduct: result
      });
    })
    .catch(err => {
      res.status(500).json({
        msg: "method /POST to /Product Err",
        error: err
      });
    });
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }));
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Product.remove({ _id: id })
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
