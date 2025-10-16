const {Sequelize} = require ("sequelize");

const sequelize = new Sequelize ("smartserve_db", "postgres", "root", {
    host: "localhost",
    dialect: "postgres"
});

module.exports= sequelize