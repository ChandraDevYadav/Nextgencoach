import { Configuration, OpenAIApi } from "openai";
import PracticeBot from "../models/practiceBot.Model.js";
import dotenv from "dotenv";
dotenv.config();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Generate GPT reply
const generateBotReply = async (practiceBot, userMessage) => {
  const prompt = `
You are roleplaying as ${practiceBot.name}, a ${practiceBot.role}.
You are currently feeling ${practiceBot.mood} and need ${practiceBot.need}.

Respond in character and realistically to the following user message:

User: "${userMessage}"
`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Stay in character and respond empathetically.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  return response.data.choices[0].message.content.trim();
};

// Create new PracticeBot session
export const createPracticeBot = async (req, res) => {
  try {
    const newBot = new PracticeBot(req.body);
    await newBot.save();
    res.status(201).json(newBot);
  } catch (err) {
    res.status(500).json({ message: "Failed to create practice bot session." });
  }
};

// Add user message and generate bot reply
export const addMessage = async (req, res) => {
  const { sender, text } = req.body;

  try {
    const bot = await PracticeBot.findById(req.params.id);
    if (!bot)
      return res.status(404).json({ message: "PracticeBot session not found" });

    bot.messages.push({ sender, text });

    const reply = await generateBotReply(bot, text);
    bot.messages.push({ sender: "bot", text: reply });

    await bot.save();
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to handle message." });
  }
};

// Get full conversation
export const getConversation = async (req, res) => {
  try {
    const bot = await PracticeBot.findById(req.params.id);
    if (!bot)
      return res.status(404).json({ message: "PracticeBot session not found" });

    res.json(bot);
  } catch (err) {
    res.status(500).json({ message: "Failed to get conversation." });
  }
};
