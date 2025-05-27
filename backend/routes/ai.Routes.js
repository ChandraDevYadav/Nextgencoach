const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const aiController = require("../controllers/ai.Controller");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `audio-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

router.post(
  "/process-audio",
  upload.single("audio"),
  aiController.processAudio
);

module.exports = router;
