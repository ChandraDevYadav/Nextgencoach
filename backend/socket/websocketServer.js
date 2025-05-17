import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// When a client connects to the WebSocket
io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Join a coaching session room
  socket.on("join-session", ({ sessionId, coachId }) => {
    socket.join(sessionId);
    console.log(`Coach ${coachId} joined session ${sessionId}`);
  });

  // Receive AI suggestions and forward them to the session
  socket.on("send-suggestions", ({ sessionId, suggestions }) => {
    io.to(sessionId).emit("receive-suggestions", suggestions);
  });

  // Handle real-time transcript updates
  socket.on("send-transcript", ({ sessionId, text }) => {
    io.to(sessionId).emit("receive-transcript", text);
  });

  // AI Practice Bot interaction
  socket.on("send-to-bot", ({ message }) => {
    const response = generateBotReply(message);
    socket.emit("bot-reply", response);
  });

  // When client disconnects
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Simple mock function for practice bot replies
function generateBotReply(message) {
  return `AI Bot: I hear you said, "${message}". Let's go deeper.`;
}

server.listen(5000, () => {
  console.log("WebSocket Server running on http://localhost:5000");
});
