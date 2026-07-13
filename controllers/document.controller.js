// D:\pdf-agent\controllers\document.controller.js
const analyzer = require("../services/documentAnalyzer.service");
const ragService = require("../services/ragQuery.service");

async function analyze(req, res, next) {
    try {
        if (!req.file) throw new Error("No file uploaded");
        const result = await analyzer.analyzePdf(req.file);
        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

async function queryDocument(req, res, next) {
    try {
        const { question } = req.body;
        if (!question) throw new Error("Question is required in the request body");
        
        const answer = await ragService.answerQuestion(question);
        res.json({ success: true, answer });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    analyze,
    queryDocument
};