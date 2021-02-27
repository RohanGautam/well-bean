const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProgressSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Progress = mongoose.model("progress", ProgressSchema);