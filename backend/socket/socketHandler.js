import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    let audioChunks = [];

    socket.on("screen-audio-chunk", async (chunk) => {
      try {
        audioChunks.push(Buffer.from(chunk));
        console.log("Received screen and audio chunk");

        const simulatedTranscript = "Transcribed text (simulated)";
        socket.emit("transcription", simulatedTranscript);

        const chatResponse = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that suggests responses based on user speech.",
            },
            { role: "user", content: simulatedTranscript },
          ],
        });

        const suggestion = chatResponse.choices[0].message.content;
        socket.emit("ai-suggestion", suggestion);
      } catch (err) {
        console.error("Error processing chunk or OpenAI API error:", err);
        socket.emit(
          "ai-error",
          "An error occurred while processing your request. Please try again."
        );
      }
    });

    socket.on("stop-recording", () => {
      console.log("Recording stopped");
      audioChunks = [];
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
