const { Menu } = require("../models");

exports.getAllMenu = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const { name, price, category,} = req.body;
    const img = req.file ? req.file.filename : null; // multer adds req.file
    const menu = await Menu.create({ name, price, category, img});
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: "Failed to add menu item" });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Menu.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: `Menu item with id ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: "Menu item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};

