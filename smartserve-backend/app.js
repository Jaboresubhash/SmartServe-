const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database connected & synced");
});

app.listen(5000, () => console.log("Server running on port 5000"));
