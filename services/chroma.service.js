// D:\pdf-agent\services\chroma.service.js
const { ChromaClient } = require("chromadb");

const client = new ChromaClient({
    path: process.env.CHROMA_URL || "http://localhost:8000"
});

async function getOrCreateCollection(collectionName) {
    return await client.getOrCreateCollection({
        name: collectionName
    });
}

module.exports = {
    getOrCreateCollection
};