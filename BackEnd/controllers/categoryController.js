const db = require("../config/db");

// Add Category
const addCategory = async (req, res) => {
  try {
    const { name, slug, description, image_url } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Category name and slug are required",
      });
    }

    const [result] = await db.query(
      `INSERT INTO categories
       (name, slug, description, image_url)
       VALUES (?, ?, ?, ?)`,
      [name, slug, description || null, image_url || null]
    );

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      category: {
        id: result.insertId,
        name,
        slug,
        description: description || null,
        image_url: image_url || null,
      },
    });
  } catch (error) {
    console.error("Add category error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Category slug already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get All Active Categories
const getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      `SELECT *
       FROM categories
       WHERE status = 'active'
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  addCategory,
  getCategories,
};