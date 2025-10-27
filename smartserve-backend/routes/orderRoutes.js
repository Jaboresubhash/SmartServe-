const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders , updateOrderStatus} = require("../controllers/orderController");

router.get("/", getAllOrders);
router.post("/", placeOrder);
router.put("/:id", updateOrderStatus);

module.exports = router;
