"use stric";
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Order = require("../models/order");
const Product = require("../models/product");
const url = process.env.URL + "orders/";

router.get("/", (req, res, next) => {
  Order.find()
    .select("_id productId qty")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        orders: docs.map(doc => {
          return {
            productId: doc.productId,
            qty: doc.qty,
            _id: doc._id,
            request: {
              types: "GET",
              url: url + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .exec()
    .then(order => {
      if (order === null) {
        res.status(400).json({ messege: "Order not found" });
      } else {
        res.status(200).json({
          order: order,
          request: {
            type: "GET",
            url: url
          }
        });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.post("/", (req, res, next) => {
  Order.findById(req.body.productId)
    .then(product => {
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        productId: req.body.productId,
        qty: req.body.qty
      });
      return order.save();
    })
    .then(result => {
      res.status(200).json({
        msg: "Create Order succesfully",
        product: result.productId,
        qty: result.qty,
        _id: result._id,
        request: {
          type: "GET",
          url: url + result._id
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        msg: "method /POST to /Product Err",
        error: err
      });
    });
});
router.patch("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .exce()
    .then()
    .catch();
});
router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
