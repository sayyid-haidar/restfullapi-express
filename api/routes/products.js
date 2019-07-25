"use stric";
const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const router = express.Router();

const chackAuth = require("../middleware/chackAuth")
const Product = require("../models/product");
const url = process.env.URL + "products/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if(file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter,
});


router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id image")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            image: doc.image,
            _id: doc._id,
            requset: {
              types: "GET",
              url: url + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price _id image")
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: url
          }
        });
      } else {
        res.status(404).json({ msg: "Not found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", chackAuth, upload.single("image"), (req, res, next) => {
  console.log(req)
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    image: req.file.path,
  });

  product
    .save()
    .then(result => {
      res.status(201).json({
        msg: "Create product succesfully",
        createProduct: {
          name: result.name,
          price: result.price,
          image: result.image,
          _id: result._id,
          request: {
            type: "GET",
            url: url + result._id
          }
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

router.patch("/:productId", chackAuth, (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result =>
      res.status(200).json({
        massage: "Product updated",
        request: {
          type: "GET",
          url: url + id
        }
      })
    )
    .catch(err => res.status(500).json({ error: err }));
});

router.delete("/:productId", chackAuth, (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result =>
      res.status(200).json({
        messege: "Product deleted",
        request: {
          type: "GET",
          url: url,
          body: { name: "String", price: "Number" }
        }
      })
    )
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
