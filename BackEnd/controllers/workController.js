const db = require("../config/db");
const cloudinary = require("../config/cloudinary");

// =====================================================
// ADD WORK
// =====================================================
const addWork = async (req, res) => {
  try {
    const {
      work_id,
      title,
      category_id,
      work_type,
      size,
      location,
      description,
    } = req.body;

    // Required fields
    if (!work_id || !title || !category_id) {
      return res.status(400).json({
        success: false,
        message: "work_id, title and category_id are required",
      });
    }

    // Check category exists
    const [category] = await db.query(
      `
      SELECT id
      FROM categories
      WHERE id = ?
      `,
      [category_id]
    );

    if (category.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check duplicate work_id
    const [existingWork] = await db.query(
      `
      SELECT id
      FROM works
      WHERE work_id = ?
      `,
      [work_id]
    );

    if (existingWork.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Work ID already exists",
      });
    }

    // Insert work
    const [result] = await db.query(
      `
      INSERT INTO works
      (
        work_id,
        title,
        category_id,
        work_type,
        size,
        location,
        description
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        work_id,
        title,
        category_id,
        work_type || null,
        size || null,
        location || null,
        description || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Work added successfully",
      work: {
        id: result.insertId,
        work_id,
        title,
        category_id,
        work_type: work_type || null,
        size: size || null,
        location: location || null,
        description: description || null,
      },
    });
  } catch (error) {
    console.error("Add work error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add work",
    });
  }
};


// =====================================================
// GET ALL WORKS
// =====================================================
const getWorks = async (req, res) => {
  try {
    const [works] = await db.query(
      `
      SELECT
        w.id,
        w.work_id,
        w.title,
        w.category_id,
        c.name AS category_name,
        w.work_type,
        w.size,
        w.location,
        w.description,
        w.created_at,

        (
          SELECT wi.image_url
          FROM work_images wi
          WHERE wi.work_id = w.id
          ORDER BY wi.sort_order ASC, wi.id ASC
          LIMIT 1
        ) AS image_url

      FROM works w

      LEFT JOIN categories c
        ON w.category_id = c.id

      ORDER BY w.created_at DESC
      `
    );

    res.json({
      success: true,
      works,
    });
  } catch (error) {
    console.error("Get works error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get works",
    });
  }
};


// =====================================================
// UPDATE WORK
// =====================================================
const updateWork = async (req, res) => {
  try {
    const { workId } = req.params;

    const {
      title,
      category_id,
      work_type,
      size,
      location,
      description,
    } = req.body;

    // Check work exists
    const [existingWork] = await db.query(
      `
      SELECT id
      FROM works
      WHERE work_id = ?
      `,
      [workId]
    );

    if (existingWork.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Work not found",
      });
    }

    // Check category
    if (category_id) {
      const [category] = await db.query(
        `
        SELECT id
        FROM categories
        WHERE id = ?
        `,
        [category_id]
      );

      if (category.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    // Update work
    await db.query(
      `
      UPDATE works
      SET
        title = ?,
        category_id = ?,
        work_type = ?,
        size = ?,
        location = ?,
        description = ?
      WHERE work_id = ?
      `,
      [
        title,
        category_id,
        work_type || null,
        size || null,
        location || null,
        description || null,
        workId,
      ]
    );

    res.json({
      success: true,
      message: "Work updated successfully",
    });
  } catch (error) {
    console.error("Update work error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update work",
    });
  }
};


// =====================================================
// DELETE WORK
// =====================================================
const deleteWork = async (req, res) => {
  try {
    const { workId } = req.params;

    // Find work using numeric database ID
    const [works] = await db.query(
      `
      SELECT id
      FROM works
      WHERE id = ?
      `,
      [workId]
    );

    if (works.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Work not found",
      });
    }

    const workDbId = works[0].id;


    // ---------------------------------------------
    // Get images
    // ---------------------------------------------
    const [images] = await db.query(
      `
      SELECT
        id,
        public_id
      FROM work_images
      WHERE work_id = ?
      `,
      [workDbId]
    );


    // ---------------------------------------------
    // Get videos
    // ---------------------------------------------
    const [videos] = await db.query(
      `
      SELECT
        id,
        public_id
      FROM work_videos
      WHERE work_id = ?
      `,
      [workDbId]
    );


    // ---------------------------------------------
    // Delete images from Cloudinary
    // ---------------------------------------------
    for (const image of images) {
      if (image.public_id) {
        try {
          await cloudinary.uploader.destroy(
            image.public_id,
            {
              resource_type: "image",
            }
          );
        } catch (cloudinaryError) {
          console.error(
            "Cloudinary image delete error:",
            cloudinaryError
          );
        }
      }
    }


    // ---------------------------------------------
    // Delete videos from Cloudinary
    // ---------------------------------------------
    for (const video of videos) {
      if (video.public_id) {
        try {
          await cloudinary.uploader.destroy(
            video.public_id,
            {
              resource_type: "video",
            }
          );
        } catch (cloudinaryError) {
          console.error(
            "Cloudinary video delete error:",
            cloudinaryError
          );
        }
      }
    }


    // ---------------------------------------------
    // Delete image records
    // ---------------------------------------------
    await db.query(
      `
      DELETE FROM work_images
      WHERE work_id = ?
      `,
      [workDbId]
    );


    // ---------------------------------------------
    // Delete video records
    // ---------------------------------------------
    await db.query(
      `
      DELETE FROM work_videos
      WHERE work_id = ?
      `,
      [workDbId]
    );


    // ---------------------------------------------
    // Delete work
    // ---------------------------------------------
    await db.query(
      `
      DELETE FROM works
      WHERE id = ?
      `,
      [workDbId]
    );


    res.json({
      success: true,
      message:
        "Work, images and videos deleted successfully",
    });
  } catch (error) {
    console.error("Delete work error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete work",
    });
  }
};


// =====================================================
// GET SINGLE WORK DETAILS
// =====================================================
const getWorkDetails = async (req, res) => {
  try {
    const { workId } = req.params;

    // IMPORTANT:
    // Frontend sends work_id like RW-TEST001
    // So we search using w.work_id
    const [works] = await db.query(
      `
      SELECT
        w.id,
        w.work_id,
        w.title,
        w.category_id,
        c.name AS category_name,
        w.work_type,
        w.size,
        w.location,
        w.description,
        w.created_at

      FROM works w

      LEFT JOIN categories c
        ON w.category_id = c.id

      WHERE w.work_id = ?
      `,
      [workId]
    );


    // Work not found
    if (works.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Work not found",
      });
    }


    const work = works[0];


    // ---------------------------------------------
    // Get images
    // ---------------------------------------------
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

      ORDER BY
        sort_order ASC,
        id ASC
      `,
      [work.id]
    );


    // ---------------------------------------------
    // Get videos
    // ---------------------------------------------
    const [videos] = await db.query(
      `
      SELECT
        id,
        work_id,
        video_url,
        public_id,
        title

      FROM work_videos

      WHERE work_id = ?

      ORDER BY id ASC
      `,
      [work.id]
    );


    // ---------------------------------------------
    // Send response
    // ---------------------------------------------
    res.json({
      success: true,

      work,

      images,

      videos,
    });

  } catch (error) {
    console.error(
      "Get work details error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get work details",
    });
  }
};


// =====================================================
// EXPORTS
// =====================================================
module.exports = {
  addWork,
  getWorks,
  updateWork,
  deleteWork,
  getWorkDetails,
};