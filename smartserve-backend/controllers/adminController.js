const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const  Admin = require("../models/admin.model");

const SECRET_KEY = "smartserve_secret";
 

// Register admin
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Admin.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (error) {
  console.error("❌ Registration Error:", error);
  res.status(500).json({ error: "Registration failed", details: error.message });

  }
};

// Login admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: admin.id, email: admin.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token, admin });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
