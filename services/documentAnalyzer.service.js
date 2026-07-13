const {extractText}=require("./pdfExtractor.service");
const { getOrCreateCollection } = require("./chroma.service");
const ai=require("./ai.service");
const prompt = require("../prompts/summary.prompt");
const parser = require("../utils/jsonParser");

// Helper function to split text into manageable chunks
function chunkText(text, chunkSize = 500, overlap = 100) {
    const words = text.split(/\s+/);
    const chunks = [];
    
    for (let i = 0; i < words.length; i += (chunkSize - overlap)) {
        const chunk = words.slice(i, i + chunkSize).join(" ");
        chunks.push(chunk);
        if (i + chunkSize >= words.length) break;
    }
    return chunks;
}

async function analyzePdf(file) {
    // 1. Extract text from the PDF
    const text = await extractText(file.path);
    
    // 2. Chunk text and index it into Chroma for future Q&A queries
    const chunks = chunkText(text);
    const collection = await getOrCreateCollection("pdf_documents");
    
    // Generate unique IDs for chunks tied to this file timestamp/name
    const ids = chunks.map((_, index) => `${file.filename}_chunk_${index}`);
    const metadatas = chunks.map(() => ({ source: file.originalname }));

    await collection.add({
        ids: ids,
        documents: chunks,
        metadatas: metadatas
    });

    // 3. Keep your original summary analysis intact
    const p = prompt(text);
    const response = await ai.analyze(p);
    return parser.parse(response);
}

module.exports = {
    analyzePdf
};