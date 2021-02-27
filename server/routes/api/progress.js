const express = require("express");
const router = express.Router();
const multer = require("multer");
const { exec } = require("child_process");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Progress Model
const Progress = require("../../models/Progress");

// @route GET api/progress
// @desc Get all items sorted by date
router.get("/", (req, res) => {
  Progress.find()
    .sort({ date: -1 })
    .then((progress) => res.json(progress));
});

// @route POST api/progress
// @desc  Post a video and add progress to DB
router.post("/", upload.single("video"), (req, res) => {
  const webmPath = req.file.path;
  const mp4Path = webmPath.replace("webm", "mp4");
  exec(`ffmpeg -i ${webmPath} ${mp4Path}`);
  const newProgress = new Progress({
    video_path: mp4Path,
  });
  newProgress.save().then((progress) => {
    res.json(progress);
  });
});

module.exports = router;
