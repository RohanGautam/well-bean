const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProgressSchema = new Schema({
    video_path: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    happy: {
        type: Number,
        default: 0
    },
    sad: {
        type: Number,
        default: 0
    },
    neutral: {
        type: Number,
        default: 0
    },
})

module.exports = Progress = mongoose.model("progress", ProgressSchema);