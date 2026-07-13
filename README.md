# PDF-AI-Analyzer 🚀

pdf-ai-analyzer is an intelligent document processing application built with Node.js and Express. It leverages **Groq (Llama 3.3)** for high-speed textual synthesis and **Chroma DB** as a vector store to power an interactive Retrieval-Augmented Generation (RAG) chat engine. Users can upload complex PDF documents, view automated insight breakdowns, and chat contextually with their documents without risking model hallucinations.

---

## 🛠️ Features

- **Automated Text Extraction:** Ingests any standard PDF structure and parses raw text seamlessly.
- **Deep Document Insights:** Instantly extracts a comprehensive summary, key bullet points, and actionable tasks.
- **Vectorized Search Infrastructure:** Chunks and indexes documents into Chroma DB dynamically upon upload.
- **RAG Q&A Workspace:** Features a split-screen user interface to query specific clauses, metrics, or statements with zero training overhead.

---

## 🏗️ Architecture Flow

1. **Upload & Extract:** PDF -> Text Extraction via `pdf-parse`.
2. **Chunk & Index:** Text split into semantic fragments -> Vectorized & saved in a local **Chroma DB** collection.
3. **Analyze:** Full structural breakdown compiled via Groq LLM completion.
4. **Query (RAG Loop):** User submits a question -> Chroma finds top matching text chunks -> Relevant context injected into the system prompt -> Groq provides an accurate, grounded answer.

---

## 📋 Prerequisites

Before starting the server, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **Chroma Server** running locally (usually on port `8000`)

---

## 🚀 Setup & Installation

### 1. Clone & Install Dependencies
Navigate to your project root and install all required packages:
```bash
npm install