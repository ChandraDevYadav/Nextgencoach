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
import zoomRoutes from "./routes/zoom.Routes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import socketHandler from "./socket/socketHandler.js";
import botRoutes from "./routes/bot.Routes.js";
import reportRoutes from "./routes/report.Routes.js";
import summaryRoutes from "./routes/summary.Routes.js";
import preQuestionRoutes from "./routes/preQuestion.Routes.js";
import prePromptRoutes from "./routes/prePrompt.Routes.js";
// import practiceBotRoutes from "./routes/practiceBot.Routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://nextgencoach.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/questionnaires", questionnaireRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/skill-builder", skillBuilderRoutes);
app.use("/api/zoom", zoomRoutes);
app.use("/api", botRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/analysis", preQuestionRoutes);
app.use("/api/preprompt", prePromptRoutes);
// app.use("/api/practiceBot", practiceBotRoutes);

// Error handler
app.use(errorHandler);

// Setup Socket.IO and delegate to handler
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
socketHandler(io);

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
