"use strict";
const Sequelize = require("sequelize");
const mongoose = require("mongoose");

const url =
  "mongodb+srv://savyd:" +
  process.env.MONGO_ATLAS_PW +
  "@olshop-jyp3m.mongodb.net/test?retryWrites=true&w=majority";
const local = "mongodb://localhost:27017/storeDB";
// mongoose.Promise = global.Promise;
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log({ mongodb: "DB Atlas Connect" }))
  .catch(() => {
    mongoose
      .connect(local, { useNewUrlParser: true })
      .then(() => console.log({ mongodb: "DB Local Connect" }))
      .catch(() => console.log({ mongodb: "DB Local Not Connect" }));
  });

// SQL Connect
const sequelize = new Sequelize("olshop", "root", "", { dialect: "mysql" });
sequelize
  .authenticate()
  .then(() => console.log({ SQL: "SQL Connect" }))
  .catch(() => console.log({ SQL: "Connect SQL failed" }));

// module.exports;
