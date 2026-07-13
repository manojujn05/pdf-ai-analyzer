// D:\pdf-agent\routes\document.routes.js
const express = require("express");
const multer = require("multer");
const controller = require("../controllers/document.controller");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

// Existing analysis route
router.post("/analyze", upload.single("pdf"), controller.analyze);

// New RAG Q&A route
router.post("/query", controller.queryDocument);

module.exports = router;