"use stric";
const mongoose = require("mongoose");
const Order = require("../models/order");
const url = process.env.URL + "orders/";

exports.GetAll = (req, res, next) => {
  Order.find()
    .select("_id productId qty")
    .populate("productId", "name")
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
};

exports.GetOne = (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate("productId", "name")
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
};

exports.PostCreate = (req, res, next) => {
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
};

exports.PatchUpdate = (req, res, next) => {
  Order.findById(req.params.orderId)
    .exce()
    .then()
    .catch();
};

exports.DeleteOne = (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
    .exec()
    .then(result =>
      res.status(200).json({
        messege: "Order deleted",
        request: {
          type: "POST",
          url: url,
          body: { productID: "ID", qty: "Number" }
        }
      })
    )
    .catch(err => res.status(500).json({ error: err }));
};
