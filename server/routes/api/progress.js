const express = require("express");
const router = express.Router();
const multer = require("multer");
const { exec } = require("child_process");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})
const upload = multer({ storage: storage });

// Progress Model
const Progress = require("../../models/Progress")

// @route POST api/progress
// @desc  Post a video and add progress to DB
router.post("/", upload.single("video"), (req, res) => {
    const webmPath = req.file.path;
    const mp4Path = webmPath.replace("webm", "mp4")
    exec(`ffmpeg -i ${webmPath} ${mp4Path}`);
})

module.exports = router;