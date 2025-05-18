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

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("join-session", ({ sessionId, coachId }) => {
    socket.join(sessionId);
    console.log(`Coach ${coachId} joined session ${sessionId}`);
  });

  socket.on("send-suggestions", ({ sessionId, suggestions }) => {
    io.to(sessionId).emit("receive-suggestions", suggestions);
  });

  socket.on("send-transcript", ({ sessionId, text }) => {
    io.to(sessionId).emit("receive-transcript", text);
  });

  socket.on("send-to-bot", ({ message }) => {
    const response = generateBotReply(message);
    socket.emit("bot-reply", response);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

function generateBotReply(message) {
  return `AI Bot: I hear you said, "${message}". Let's go deeper.`;
}

server.listen(5000, () => {
  console.log("WebSocket Server running on http://localhost:5000");
});
