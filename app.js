// D:\pdf-agent\app.js
const express = require("express");
const path = require("path");
const documentRoutes = require("./routes/document.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/document", documentRoutes);

// Base HTML Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: err.message || "Internal Server Error"
    });
});

module.exports = app;