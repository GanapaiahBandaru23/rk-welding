const multer = require("multer");

const storage = multer.memoryStorage();

const uploadVideo = multer({
  storage: storage,

  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only MP4, WEBM, MOV, AVI and MKV videos are allowed"
        )
      );
    }
  },
});

module.exports = uploadVideo;