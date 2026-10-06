const express = require("express");

const {
  addWorkVideo,
  getWorkVideos,
  deleteWorkVideo,
} = require("../controllers/workVideoController");

const authMiddleware = require("../middleware/authMiddleware");
const uploadVideo = require("../middleware/videoUploadMiddleware");

const router = express.Router();


// Add Work Video - Admin only
router.post(
  "/",
  authMiddleware,
  uploadVideo.single("video"),
  addWorkVideo
);


// Get Work Videos - Public
router.get(
  "/:workId",
  getWorkVideos
);


// Delete Work Video - Admin only
router.delete(
  "/:id",
  authMiddleware,
  deleteWorkVideo
);


module.exports = router;