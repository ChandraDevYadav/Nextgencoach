import PracticeBot from "../models/practiceBot.Model.js";
import axios from "axios";

// Constants
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const API_TIMEOUT = 10000; // 10 seconds
const INSUFFICIENT_BALANCE_ERROR =
  "I'm currently unavailable due to a service issue. Please try again later or contact support.";

// Helper: Check for DeepSeek billing errors
const isBillingError = (error) => {
  return (
    error.response?.status === 402 ||
    error.response?.data?.error?.message?.includes("Insufficient Balance")
  );
};

// Generate bot reply with billing error handling
const generateBotReply = async (practiceBot, userMessage) => {
  if (!userMessage?.trim()) {
    return "I didn't receive your message. Could you please repeat that?";
  }

  const prompt = `You are ${practiceBot.name}, a ${practiceBot.role}.
You feel ${practiceBot.mood} and need ${practiceBot.need}.

Respond in character to:
User: "${userMessage}"
`;

  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `Maintain ${practiceBot.name}'s persona (${practiceBot.role}) who feels ${practiceBot.mood}.`,
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        timeout: API_TIMEOUT,
      }
    );

    return (
      response.data.choices[0]?.message?.content?.trim() ||
      INSUFFICIENT_BALANCE_ERROR
    );
  } catch (error) {
    console.error("DeepSeek API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return isBillingError(error)
      ? INSUFFICIENT_BALANCE_ERROR
      : `As ${practiceBot.name}, I'm having technical difficulties. Please try again.`;
  }
};

// Validate request data
const validateRequest = (data, isBotCreation = false) => {
  if (isBotCreation) {
    const required = ["name", "role", "mood", "need"];
    const missing = required.filter((field) => !data[field]);
    if (missing.length)
      throw new Error(`Missing fields: ${missing.join(", ")}`);
  }

  if (data.text && !data.text.trim()) {
    throw new Error("Message text cannot be empty");
  }
};

// Controllers
export const createPracticeBot = async (req, res) => {
  try {
    validateRequest(req.body, true);

    const newBot = new PracticeBot({
      ...req.body,
      messages: [
        {
          sender: "bot",
          text: `Hi! I'm ${req.body.name}, a ${req.body.role}. I'm feeling ${req.body.mood} about ${req.body.need}.`,
        },
      ],
    });

    await newBot.save();
    res.status(201).json(newBot);
  } catch (err) {
    console.error("Create Bot Error:", err);
    res.status(400).json({
      success: false,
      message: err.message || "Failed to create session",
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

export const addMessage = async (req, res) => {
  try {
    validateRequest(req.body);
    const bot = await PracticeBot.findById(req.params.id);
    if (!bot) return res.status(404).json({ message: "Session not found" });

    // Add user message
    bot.messages.push({
      sender: req.body.sender || "user",
      text: req.body.text,
    });

    // Get bot response
    const botReply = await generateBotReply(bot, req.body.text);
    bot.messages.push({ sender: "bot", text: botReply });

    await bot.save();
    res.json({ reply: botReply });
  } catch (err) {
    console.error("Add Message Error:", err);
    res.status(err.message.includes("cannot be empty") ? 400 : 500).json({
      success: false,
      message: err.message || "Failed to process message",
    });
  }
};

export const getConversation = async (req, res) => {
  try {
    const bot = await PracticeBot.findById(req.params.id);
    if (!bot) return res.status(404).json({ message: "Session not found" });
    res.json(bot);
  } catch (err) {
    console.error("Get Conversation Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve conversation",
    });
  }
};
