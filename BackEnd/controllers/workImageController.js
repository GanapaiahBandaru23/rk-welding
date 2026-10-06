

const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// ADD WORK IMAGE
const addWorkImage = async (req, res) => {
  try {
    const { work_id, sort_order } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    if (!work_id) {
      return res.status(400).json({
        success: false,
        message: "work_id is required",
      });
    }

    const [work] = await db.query(
      "SELECT id FROM works WHERE id = ?",
      [work_id]
    );

    if (work.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Work not found",
      });
    }

    const image_url =
      `/uploads/works/${req.file.filename}`;

    const [result] = await db.query(
      `
      INSERT INTO work_images
      (work_id, image_url, sort_order)
      VALUES (?, ?, ?)
      `,
      [
        work_id,
        image_url,
        sort_order || 0,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Work image added successfully",
      image: {
        id: result.insertId,
        work_id,
        image_url,
        sort_order: sort_order || 0,
      },
    });

  } catch (error) {
    console.error("Add work image error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add work image",
    });
  }
};


// GET WORK IMAGES
const getWorkImages = async (req, res) => {
  try {
    const { workId } = req.params;

    const [images] = await db.query(
      `
      SELECT
        id,
        work_id,
        image_url,
        sort_order
      FROM work_images
      WHERE work_id = ?
      ORDER BY sort_order ASC, id ASC
      `,
      [workId]
    );

    res.json({
      success: true,
      images,
    });

  } catch (error) {
    console.error("Get work images error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get work images",
    });
  }
};


// DELETE WORK IMAGE
const deleteWorkImage = async (req, res) => {
  try {
    const { id } = req.params;

    const [images] = await db.query(
      `
      SELECT id, image_url
      FROM work_images
      WHERE id = ?
      `,
      [id]
    );

    if (images.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    const image = images[0];

    // Delete image file from uploads folder
    const filePath = path.join(
      __dirname,
      "..",
      image.image_url
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete image record from database
    await db.query(
      "DELETE FROM work_images WHERE id = ?",
      [id]
    );

    res.json({
      success: true,
      message: "Work image deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete work image error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete work image",
    });
  }
};


module.exports = {
  addWorkImage,
  getWorkImages,
  deleteWorkImage,
};
