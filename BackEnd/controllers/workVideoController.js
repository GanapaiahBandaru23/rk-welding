const db = require("../config/db");
const fs = require("fs");
const path = require("path");


// =========================
// ADD WORK VIDEO
// =========================

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

    const video_url =
      `/uploads/videos/${req.file.filename}`;

    const [result] = await db.query(
      `
      INSERT INTO work_videos
      (work_id, video_url, title)
      VALUES (?, ?, ?)
      `,
      [
        work_id,
        video_url,
        title || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Work video added successfully",

      video: {
        id: result.insertId,
        work_id,
        video_url,
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
      message: "Server error",
    });
  }
};


// =========================
// GET VIDEOS FOR A WORK
// =========================

const getWorkVideos = async (req, res) => {
  try {
    const { workId } = req.params;

    const [videos] = await db.query(
      `
      SELECT
        id,
        work_id,
        video_url,
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
      message: "Server error",
    });
  }
};


// =========================
// DELETE WORK VIDEO
// =========================

const deleteWorkVideo = async (req, res) => {
  try {
    const { id } = req.params;

    // Find video
    const [videos] = await db.query(
      `
      SELECT
        id,
        video_url
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


    // =========================
    // DELETE ACTUAL VIDEO FILE
    // =========================

    if (video.video_url) {

      const filePath = path.join(
        __dirname,
        "..",
        video.video_url
      );

      try {

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);

          console.log(
            "Video file deleted:",
            filePath
          );
        } else {

          console.log(
            "Video file not found:",
            filePath
          );

        }

      } catch (fileError) {

        console.error(
          "Video file delete error:",
          fileError
        );

      }
    }


    // =========================
    // DELETE DATABASE RECORD
    // =========================

    await db.query(
      `
      DELETE FROM work_videos
      WHERE id = ?
      `,
      [id]
    );


    // =========================
    // SUCCESS RESPONSE
    // =========================

    res.json({
      success: true,
      message:
        "Work video deleted successfully",
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