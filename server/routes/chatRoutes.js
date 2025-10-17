import express from "express";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
let conversationHistory = [];

// Load local knowledge base
let KB = [];
try {
  // Resolve path relative to this file so it works regardless of cwd
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const kbPath = path.resolve(__dirname, '..', 'data', 'knowledgeBase.json');
  const raw = fs.readFileSync(kbPath, 'utf8');
  KB = JSON.parse(raw);
  console.debug('[chatRoutes] Loaded KB entries:', KB.length);
} catch (e) {
  console.warn('[chatRoutes] Could not load KB:', e && e.message);
}

function findKbAnswer(message) {
  const q = message.toLowerCase();
  for (const item of KB) {
    for (const alias of item.aliases || []) {
      if (q.includes(alias)) return item.text;
    }
    if ((item.title || '').toLowerCase().split(' ').some(t => q.includes(t))) return item.text;
  }
  return null;
}

router.post("/send", async (req, res) => {
  try {
    console.debug('[chatRoutes] POST /send - body:', req.body);
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    // Save user message to conversation history
    conversationHistory.push({ role: "user", parts: [{ text: message }] });

    // Check local KB first (quick, deterministic answers)
    const kbReply = findKbAnswer(message);
    if (kbReply) {
      conversationHistory.push({ role: 'model', parts: [{ text: kbReply }] });
      return res.json({ reply: kbReply, source: 'kb' });
    }

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
