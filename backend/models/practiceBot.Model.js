import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: String, enum: ["user", "bot"], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const practiceBotSchema = new mongoose.Schema({
  name: String,
  role: String,
  mood: String,
  need: String,
  messages: [messageSchema],
});

const PracticeBot = mongoose.model("PracticeBot", practiceBotSchema);

export default PracticeBot;
