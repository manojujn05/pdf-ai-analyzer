// D:\pdf-agent\services\ragQuery.service.js
const { getOrCreateCollection } = require("./chroma.service");
const ai = require("./ai.service");

    async function answerQuestion(question) {
    const collection = await getOrCreateCollection("pdf_documents");
    // 1. Search Chroma for the top 3 most relevant sections
    const searchResults = await collection.query({
        queryTexts: [question],
        nResults: 3
    });
    const retrievedChunks = searchResults.documents[0] || [];
    if (retrievedChunks.length === 0) {
        return "No relevant context found in the uploaded documents to answer this question.";
    }
    // 2. Construct the context string
    const context = retrievedChunks.join("\n\n---\n\n");
    // 3. Build a targeted system/user prompt constraint for Groq
    const ragPrompt = `
    You are a precise document assistant. Answer the user's question based strictly on the provided Context sections below. 
    If the answer cannot be confidently derived from the context, respond with "I cannot find the answer within the uploaded document."
    Context:
    -----------------------
    ${context}
    -----------------------
    Question: ${question}
    Answer:
    `;
        // 4. Run through your existing Groq AI service
        return await ai.analyze(ragPrompt);
    }

    module.exports = {
        answerQuestion
    };