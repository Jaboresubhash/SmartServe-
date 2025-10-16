const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders } = require("../controllers/orderController");

router.get("/", getAllOrders);
router.post("/", placeOrder);

module.exports = router;
