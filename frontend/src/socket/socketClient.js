import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

// Join session
socket.emit("join-session", { sessionId: "abc123", coachId: "coach42" });

// Listen for AI suggestions
socket.on("receive-suggestions", (data) => {
  console.log("AI Suggestions:", data);
});

// Send transcript update
socket.emit("send-transcript", {
  sessionId: "abc123",
  text: "Hello, welcome to our session.",
});

// Practice bot interaction
socket.emit("send-to-bot", { message: "What is going on." });
socket.on("bot-reply", (reply) => {
  console.log(reply);
});
