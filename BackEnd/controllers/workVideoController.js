const db = require("../config/db");
const cloudinary = require("../config/cloudinary");

// ADD WORK VIDEO
const addWorkVideo = async (req, res) => {
  try {
    const { work_id, title } = req.body;

    if (!work_id) {
      return res.status(400).json({
        success: false,
        message: "Work ID is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video is required",
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

    // Upload video to Cloudinary
    const uploadResult = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "rk-welding/videos",
            resource_type: "video",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(req.file.buffer);
      }
    );

    // Cloudinary secure URL
    const video_url = uploadResult.secure_url;

    // Cloudinary Public ID
    const public_id = uploadResult.public_id;

    // Save video details in database
    const [result] = await db.query(
      `
      INSERT INTO work_videos
      (work_id, video_url, public_id, title)
      VALUES (?, ?, ?, ?)
      `,
      [
        work_id,
        video_url,
        public_id,
        title || null,
      ]
    );

    res.status(201).json({
      success: true,
      message:
        "Work video uploaded to Cloudinary successfully",

      video: {
        id: result.insertId,
        work_id,
        video_url,
        public_id,
        title: title || null,
      },
    });

  } catch (error) {
    console.error(
      "Add work video error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to upload work video",
    });
  }
};


// GET VIDEOS FOR A WORK
const getWorkVideos = async (req, res) => {
  try {
    const { workId } = req.params;

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
      [workId]
    );

    res.json({
      success: true,
      videos,
    });

  } catch (error) {
    console.error(
      "Get work videos error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to get work videos",
    });
  }
};


// DELETE WORK VIDEO
const deleteWorkVideo = async (req, res) => {
  try {
    const { id } = req.params;

    // Get video details from database
    const [videos] = await db.query(
      `
      SELECT
        id,
        video_url,
        public_id
      FROM work_videos
      WHERE id = ?
      `,
      [id]
    );

    if (videos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    const video = videos[0];

    // Delete video from Cloudinary
    if (video.public_id) {
      await cloudinary.uploader.destroy(
        video.public_id,
        {
          resource_type: "video",
        }
      );
    }

    // Delete video record from database
    await db.query(
      `
      DELETE FROM work_videos
      WHERE id = ?
      `,
      [id]
    );

    res.json({
      success: true,
      message:
        "Work video deleted from Cloudinary and database successfully",
    });

  } catch (error) {
    console.error(
      "Delete work video error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete work video",
    });
  }
};


module.exports = {
  addWorkVideo,
  getWorkVideos,
  deleteWorkVideo,
};