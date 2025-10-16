const sequelize = require("../config/dbConfig");
const Menu = require("./menu.model");
const Order = require("./order.model");

module.exports = { sequelize, Menu, Order };
