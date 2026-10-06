const express = require("express");

const {
  addWorkImage,
  getWorkImages,
  deleteWorkImage,
} = require("../controllers/workImageController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();


// Add Work Image - Admin only
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  addWorkImage
);


// Get Work Images - Public
router.get(
  "/:workId",
  getWorkImages
);


// Delete Work Image - Admin only
router.delete(
  "/:id",
  authMiddleware,
  deleteWorkImage
);


module.exports = router;