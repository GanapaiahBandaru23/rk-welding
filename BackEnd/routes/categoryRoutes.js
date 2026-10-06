const express = require("express");
const {
  addCategory,
  getCategories,
} = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add Category - Admin only
router.post("/", authMiddleware, addCategory);

// Get Categories - Public
router.get("/", getCategories);

module.exports = router;