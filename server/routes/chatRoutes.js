import express from "express";

const router = express.Router();
let conversationHistory = [];

router.post("/send", async (req, res) => {
  try {
    console.debug('[chatRoutes] POST /send - body:', req.body);
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    // Save user message to conversation history
    conversationHistory.push({ role: "user", parts: [{ text: message }] });

    // If GEMINI API key is not provided, return a simple fallback reply so the chat can be tested locally
    if (!process.env.GEMINI_API_KEY) {
      let fallback = `You said: ${message}`;
      if (message.toLowerCase().includes("recommend")) {
        fallback = "Here are some recommendations: Classic Tee, Slim Jeans, and Casual Jacket.";
      }
      // Save fallback reply too
      conversationHistory.push({ role: "model", parts: [{ text: fallback }] });
      return res.json({ reply: fallback });
    }

    // Lazily import Gemini client at runtime so server can start even if the
    // package is not installed. If the package is missing, return a helpful
    // fallback response instead (this prevents startup crashes during local dev).
    let text;
    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const chat = model.startChat({ history: conversationHistory });

      // Optionally use a different prompt when user asks for recommendations
      const payload = message;

      const result = await chat.sendMessage(payload);
      const response = await result.response;
      text = await response.text();
    } catch (err) {
      console.warn("Generative AI package not available or failed; using fallback.", err && err.message);
      if (message.toLowerCase().includes("recommend")) {
        text = "Here are some recommendations: Classic Tee, Slim Jeans, and Casual Jacket.";
      } else {
        text = `You said: ${message}`;
      }
    }

    conversationHistory.push({ role: "model", parts: [{ text }] });
    res.json({ reply: text });
  } catch (error) {
    // Log full stack for debugging
    console.error("Chat route error:", error && (error.stack || error));
    // Return the error message to the client in development to aid debugging
    const errMsg = (error && error.message) || "Something went wrong";
    res.status(500).json({ error: errMsg });
  }
});

export { router };
