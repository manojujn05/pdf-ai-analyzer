// D:\pdf-agent\public\js\app.js
document.addEventListener("DOMContentLoaded", () => {
    const pdfInput = document.getElementById("pdf");
    const analyzeBtn = document.getElementById("analyze");
    const loading = document.getElementById("loading");
    const workspace = document.getElementById("workspace");
    
    const summaryText = document.getElementById("summary");
    const pointsList = document.getElementById("points");
    const actionsList = document.getElementById("actions");

    const questionInput = document.getElementById("question");
    const askBtn = document.getElementById("ask-btn");
    const chatBox = document.getElementById("chat-box");

    // Upload & Analyze PDF
    analyzeBtn.addEventListener("click", async () => {
        const file = pdfInput.files[0];
        if (!file) {
            alert("Please select a PDF file first.");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", file);

        loading.classList.remove("hidden");
        workspace.classList.add("hidden");
        pointsList.innerHTML = "";
        actionsList.innerHTML = "";

        try {
            const response = await fetch("/api/document/analyze", {
                method: "POST",
                body: formData
            });
            const result = await response.json();

            if (!result.success) throw new Error(result.error || "Analysis failed");

            const data = result.data;
            summaryText.textContent = data.summary || "No summary generated.";

            if (data.mainPoints) {
                data.mainPoints.forEach(pt => {
                    const li = document.createElement("li");
                    li.textContent = pt;
                    pointsList.appendChild(li);
                });
            }

            if (data.actionItems) {
                data.actionItems.forEach(item => {
                    const li = document.createElement("li");
                    li.textContent = item;
                    actionsList.appendChild(li);
                });
            }

            loading.classList.add("hidden");
            workspace.classList.remove("hidden");
        } catch (error) {
            loading.classList.add("hidden");
            alert("Error processing file: " + error.message);
        }
    });

    // RAG Chat Submission
    async function handleQuestionSubmit() {
        const question = questionInput.value.trim();
        if (!question) return;

        appendMessage("user", question);
        questionInput.value = "";
        const typingId = appendMessage("system", "Thinking...");

        try {
            const response = await fetch("/api/document/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question })
            });
            const result = await response.json();
            document.getElementById(typingId).remove();

            if (!result.success) throw new Error(result.error || "Failed to query server");
            appendMessage("ai", result.answer);
        } catch (error) {
            console.error(error);
            appendMessage("system", "Error fetching response from the server.");
        }
    }

    function appendMessage(sender, text) {
        const msgDiv = document.createElement("div");
        const uniqueId = "msg_" + Date.now();
        msgDiv.id = uniqueId;
        msgDiv.className = `message ${sender}-message`;
        msgDiv.textContent = text;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        return uniqueId;
    }

    askBtn.addEventListener("click", handleQuestionSubmit);
    questionInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleQuestionSubmit();
    });
});