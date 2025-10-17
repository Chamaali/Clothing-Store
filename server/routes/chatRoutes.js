import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
let conversationHistory = [];

router.post('/send', async (req, res) => {
  try {
    const { message } = req.body;
    conversationHistory.push({ role: 'user', parts: [{ text: message }] });

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({ history: conversationHistory });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = await response.text();

    conversationHistory.push({ role: 'model', parts: [{ text }] });
    res.json({ reply: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export { router };