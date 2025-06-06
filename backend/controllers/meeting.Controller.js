import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Bot
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Upload audio and get transcription
export const uploadMeetingAudio = async (req, res) => {
  try {
    const audioPath = req.file.path;

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-1",
      response_format: "json",
    });

    // Store transcription in DB
    res.json({ transcription: transcription.text });
  } catch (error) {
    console.error("Transcription error:", error);
    res.status(500).json({ message: "Failed to transcribe audio", error });
  }
};

// Return saved transcript
export const getCoachingReport = async (req, res) => {
  const { meetingId } = req.params;

  // retrieve from DB
  res.json({
    meetingId,
    summary: "This is a placeholder coaching summary for the meeting.",
  });
};
