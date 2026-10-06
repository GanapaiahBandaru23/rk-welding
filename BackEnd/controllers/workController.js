const db = require("../config/db");
const fs = require("fs");
const path = require("path");


// ========================================
// ADD WORK
// ========================================
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

    if (!work_id || !title || !category_id) {
      return res.status(400).json({
        success: false,
        message:
          "Work ID, title and category are required",
      });
    }

    const [category] = await db.query(
      `
      SELECT id
      FROM categories
      WHERE id = ?
        AND status = 'active'
      `,
      [category_id]
    );

    if (category.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

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
    console.error(
      "Add work error:",
      error
    );

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Work ID already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ========================================
// GET ALL ACTIVE WORKS
// ========================================
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
        c.slug AS category_slug,
        w.work_type,
        w.size,
        w.location,
        w.description,
        w.status,
        w.created_at,

        (
          SELECT wi.image_url
          FROM work_images wi
          WHERE wi.work_id = w.id
          ORDER BY
            wi.sort_order ASC,
            wi.id ASC
          LIMIT 1
        ) AS image_url

      FROM works w

      INNER JOIN categories c
        ON w.category_id = c.id

      WHERE w.status = 'active'
        AND c.status = 'active'

      ORDER BY w.created_at DESC
      `
    );

    res.json({
      success: true,
      works,
    });

  } catch (error) {
    console.error(
      "Get works error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ========================================
// UPDATE WORK
// ========================================
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

    if (!title || !category_id) {
      return res.status(400).json({
        success: false,
        message:
          "Work title and category are required",
      });
    }

    const [work] = await db.query(
      `
      SELECT id
      FROM works
      WHERE work_id = ?
      `,
      [workId]
    );

    if (work.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Work not found",
      });
    }

    const [category] = await db.query(
      `
      SELECT id
      FROM categories
      WHERE id = ?
        AND status = 'active'
      `,
      [category_id]
    );

    if (category.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

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
    console.error(
      "Update work error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update work",
    });
  }
};


// ========================================
// DELETE WORK
// ========================================
const deleteWork = async (req, res) => {
  try {
    const { workId } = req.params;

    // ------------------------------------
    // 1. FIND WORK
    // ------------------------------------
    const [works] = await db.query(
      `
      SELECT id
      FROM works
      WHERE work_id = ?
      `,
      [workId]
    );

    if (works.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Work not found",
      });
    }

    const workDatabaseId = works[0].id;


    // ------------------------------------
    // 2. GET ALL IMAGE FILE PATHS
    // ------------------------------------
    const [images] = await db.query(
      `
      SELECT image_url
      FROM work_images
      WHERE work_id = ?
      `,
      [workDatabaseId]
    );


    // ------------------------------------
    // 3. GET ALL VIDEO FILE PATHS
    // ------------------------------------
    const [videos] = await db.query(
      `
      SELECT video_url
      FROM work_videos
      WHERE work_id = ?
      `,
      [workDatabaseId]
    );


    // ------------------------------------
    // 4. DELETE IMAGE FILES
    // ------------------------------------
    for (const image of images) {
      if (!image.image_url) {
        continue;
      }

      const filePath = path.join(
        __dirname,
        "..",
        image.image_url
      );

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (fileError) {
        console.error(
          "Image file delete error:",
          fileError
        );
      }
    }


    // ------------------------------------
    // 5. DELETE VIDEO FILES
    // ------------------------------------
    for (const video of videos) {
      if (!video.video_url) {
        continue;
      }

      const filePath = path.join(
        __dirname,
        "..",
        video.video_url
      );

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (fileError) {
        console.error(
          "Video file delete error:",
          fileError
        );
      }
    }


    // ------------------------------------
    // 6. DELETE IMAGE DATABASE RECORDS
    // ------------------------------------
    await db.query(
      `
      DELETE FROM work_images
      WHERE work_id = ?
      `,
      [workDatabaseId]
    );


    // ------------------------------------
    // 7. DELETE VIDEO DATABASE RECORDS
    // ------------------------------------
    await db.query(
      `
      DELETE FROM work_videos
      WHERE work_id = ?
      `,
      [workDatabaseId]
    );


    // ------------------------------------
    // 8. DELETE WORK
    // ------------------------------------
    await db.query(
      `
      DELETE FROM works
      WHERE id = ?
      `,
      [workDatabaseId]
    );


    // ------------------------------------
    // 9. SUCCESS RESPONSE
    // ------------------------------------
    res.json({
      success: true,
      message:
        "Work, photos and videos deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete work error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete work",
    });
  }
};


// ========================================
// GET SINGLE WORK DETAILS
// ========================================
const getWorkDetails = async (req, res) => {
  try {
    const { workId } = req.params;

    const [works] = await db.query(
      `
      SELECT
        w.id,
        w.work_id,
        w.title,
        w.category_id,
        c.name AS category_name,
        c.slug AS category_slug,
        w.work_type,
        w.size,
        w.location,
        w.description,
        w.status,
        w.created_at

      FROM works w

      INNER JOIN categories c
        ON w.category_id = c.id

      WHERE w.work_id = ?
        AND w.status = 'active'
        AND c.status = 'active'
      `,
      [workId]
    );

    if (works.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Work not found",
      });
    }

    const work = works[0];


    // GET IMAGES
    const [images] = await db.query(
      `
      SELECT
        id,
        image_url,
        sort_order

      FROM work_images

      WHERE work_id = ?

      ORDER BY
        sort_order ASC,
        id ASC
      `,
      [work.id]
    );


    // GET VIDEOS
    const [videos] = await db.query(
      `
      SELECT
        id,
        video_url,
        title

      FROM work_videos

      WHERE work_id = ?

      ORDER BY id ASC
      `,
      [work.id]
    );


    res.json({
      success: true,

      work: {
        id: work.id,
        work_id: work.work_id,
        title: work.title,
        category_id: work.category_id,
        category_name:
          work.category_name,
        category_slug:
          work.category_slug,
        work_type:
          work.work_type,
        size:
          work.size,
        location:
          work.location,
        description:
          work.description,
        images,
        videos,
      },
    });

  } catch (error) {
    console.error(
      "Get work details error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ========================================
// EXPORTS
// ========================================
module.exports = {
  addWork,
  getWorks,
  updateWork,
  deleteWork,
  getWorkDetails,
};