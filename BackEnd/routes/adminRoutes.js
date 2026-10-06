const express = require("express");
const { adminLogin } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", adminLogin);

router.get("/test-auth", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Admin authentication working",
    admin: req.admin,
  });
});

module.exports = router;