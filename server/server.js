const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const progress = require("./routes/api/progress")

const app = express();

// Middleware
app.use(bodyParser.json())

// DB Config
const db = require("./keys").mongoURI;

// Connect to DB
mongoose
    .connect(db)
    .then(() => {
        console.log("MongoDB Connected...");
    }).catch(err => console.log(err));

// Use routes
app.use("/api/progress", progress)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));