const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(__dirname, "../uploads/videos")
    );
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName +
        path.extname(file.originalname)
    );
  },
});

const uploadVideo = multer({
  storage: storage,

  limits: {
    fileSize: 50 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes =
      /mp4|webm|mov|avi|mkv/;

    const extname = allowedTypes.test(
      path
        .extname(file.originalname)
        .toLowerCase()
    );

    const mimetype =
      file.mimetype.startsWith("video/");

    if (extname && mimetype) {
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