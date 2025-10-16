const express = require("express");
const router = express.Router();
const { getAllMenu, addMenuItem } = require("../controllers/menuController");

router.get("/", getAllMenu);
router.post("/", addMenuItem);

module.exports = router;
