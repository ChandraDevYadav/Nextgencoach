import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "http";
import "dotenv/config";

import questionnaireRoutes from "./routes/questionnaire.Routes.js";
import sessionRoutes from "./routes/sessionPrep.Routes.js";
import skillBuilderRoutes from "./routes/skillBuilder.Routes.js";
import authRoutes from "./routes/auth.Routes.js";
import liveCoachingRoutes from "./routes/liveCoaching.Routes.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/questionnaires", questionnaireRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/skill-builder", skillBuilderRoutes);
app.use("/api/live-coaching", liveCoachingRoutes);

app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("transcript", (data) => {
    const suggestions = generateAISuggestions(data.text);
    socket.emit("suggestions", suggestions);
  });

  socket.on("startPracticeSession", (avatarConfig) => {
    const intro = `Hello, I'm ${
      avatarConfig.name || "your coach"
    }. Let's get started.`;
    socket.emit("practiceStarted", { message: intro });
  });

  socket.on("practiceMessage", (msg) => {
    const reply = generateAIPracticeReply(msg.text);
    socket.emit("practiceReply", { text: reply });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

function generateAISuggestions(text) {
  return [
    "Can you expand on that?",
    "What support do you need right now?",
    "How did that make you feel?",
  ];
}

function generateAIPracticeReply(text) {
  if (!text) return "Can you say that again?";
  const lower = text.toLowerCase();
  if (lower.includes("goal"))
    return "What does achieving that goal mean to you?";
  if (lower.includes("struggle"))
    return "Tell me more about what you're struggling with.";
  if (lower.includes("motivate"))
    return "What usually helps you stay motivated?";
  return "That's interesting. Can you elaborate on that?";
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
