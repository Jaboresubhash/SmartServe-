const { Order } = require("../models");

exports.placeOrder = async (req, res) => {
  try {
    const { table_no, items } = req.body;
    const order = await Order.create({ table_no, items });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
