const express = require("express");
const router = express.Router();
const { getAllMenu, addMenuItem } = require("../controllers/menuController");
const menuController = require("../controllers/menuController");
const upload = require("../middleware/uploadMiddleware");

// router.get("/", getAllMenu);
// router.post("/", addMenuItem);
router.get("/", menuController.getAllMenu);
router.post("/", upload.single("img"), menuController.addMenuItem);
router.delete("/:id", menuController.deleteMenuItem);

// Update menu item (also supports updating image)
router.put("/:id", upload.single("img"), menuController.updateMenu);
module.exports = router;
