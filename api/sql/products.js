"use strict";
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Products extends Model{};
Products.init({
    id: "",
    code: Sequelize.INTEGER,
    image: Sequelize.String,
    name: Sequelize.String,
    varian: Sequelize.String,
    price: Sequelize.INTEGER,
    stock: Sequelize.INTEGER,
    categorieId: Sequelize.String,
    description: Sequelize.TEXT,
})

module.exports = Products;