const express = require("express");
const router = express.Router();
const multer = require("multer");
const { exec } = require("child_process");
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + file.originalname);
    }
})
const upload = multer({ storage: storage });

// Progress Model
const Progress = require("../../models/Progress");

// @route GET api/progress
// @desc Get all items sorted by date
router.get("/", (req, res) => {
    Progress.find()
        .sort({ date: -1 })
        .then(progress => res.json(progress))
})

// @route GET api/progress/latest
// @desc Get the latest check-in
router.get("/latest", (req, res) => {
    Progress.find()
        .limit(1)
        .sort({ date: -1 })
        .then(progress => {
            res.json(progress[0])
        })
})

// @route POST api/progress
// @desc  Post a video and add progress to DB
router.post("/", upload.single("video"), (req, res) => {
    const webmPath = req.file.path;
    const mp4Path = webmPath.replace(".webm", "X.mp4")

    exec(`ffmpeg -i ${webmPath} ${mp4Path}`, (error, stdout, stderr) => {
        let python_parent = "/Users/laksh/Desktop/Projects/well-bean/server"
        const pp_command = `${python_parent}/emotion-recognition/emotions.py`
        const src = `${python_parent}/${mp4Path}`;
        const dest = `${python_parent}/${mp4Path.replace("X", "")}`;
        exec(`python3  ${pp_command} ${src} ${dest}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    });

    const newProgress = new Progress({
        video_path: mp4Path
    });
    newProgress.save().then(progress => {
        res.json(progress);
    })
});

module.exports = router;