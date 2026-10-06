const express = require("express");

const {
  addWork,
  getWorks,
  updateWork,
  deleteWork,
  getWorkDetails,
} = require("../controllers/workController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ========================================
// ADD WORK - ADMIN ONLY
// ========================================
router.post(
  "/",
  authMiddleware,
  addWork
);


// ========================================
// GET ALL WORKS - PUBLIC
// ========================================
router.get(
  "/",
  getWorks
);


// ========================================
// UPDATE WORK - ADMIN ONLY
// ========================================
router.put(
  "/:workId",
  authMiddleware,
  updateWork
);


// ========================================
// DELETE WORK - ADMIN ONLY
// ========================================
router.delete(
  "/:workId",
  authMiddleware,
  deleteWork
);


// ========================================
// GET SINGLE WORK DETAILS - PUBLIC
// ========================================
router.get(
  "/:workId",
  getWorkDetails
);


module.exports = router;