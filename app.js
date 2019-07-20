"use strict";
const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const url =
  "mongodb+srv://savyd:" +
  process.env.MONGO_ATLAS_PW +
  "@olshop-jyp3m.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/products", require("./api/routes/products"));
app.use("/orders", require("./api/routes/orders"));

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
