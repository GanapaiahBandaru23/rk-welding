const db = require("../config/db");
const cloudinary = require("../config/cloudinary");

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

    // Check work exists
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

    // Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "rk-welding/works",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(req.file.buffer);
    });

    // Cloudinary URL
    const image_url = uploadResult.secure_url;

    // Cloudinary Public ID
    const public_id = uploadResult.public_id;

    // Save image details in database
    const [result] = await db.query(
      `
      INSERT INTO work_images
      (work_id, image_url, public_id, sort_order)
      VALUES (?, ?, ?, ?)
      `,
      [
        work_id,
        image_url,
        public_id,
        sort_order || 0,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Work image uploaded to Cloudinary successfully",

      image: {
        id: result.insertId,
        work_id,
        image_url,
        public_id,
        sort_order: sort_order || 0,
      },
    });

  } catch (error) {
    console.error("Add work image error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload work image",
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
        public_id,
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

    // Get image details from database
    const [images] = await db.query(
      `
      SELECT
        id,
        image_url,
        public_id
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

    // Delete image from Cloudinary
    if (image.public_id) {
      await cloudinary.uploader.destroy(
        image.public_id,
        {
          resource_type: "image",
        }
      );
    }

    // Delete image record from database
    await db.query(
      `
      DELETE FROM work_images
      WHERE id = ?
      `,
      [id]
    );

    res.json({
      success: true,
      message:
        "Work image deleted from Cloudinary and database successfully",
    });

  } catch (error) {
    console.error("Delete work image error:", error);

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