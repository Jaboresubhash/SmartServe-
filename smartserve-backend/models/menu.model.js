const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Menu = sequelize.define("Menu", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   img: {
    type: DataTypes.STRING, // will store the image filename or URL
    allowNull: true,
  },
});

module.exports = Menu;
