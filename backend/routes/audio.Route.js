import express from "express";
import multer from "multer";
import fs from "fs";
import OpenAI from "openai";
import path from "path";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    const audioPath = path.resolve(req.file.path);

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-1",
    });

    const prompt = `You are a coaching assistant. Based on this session transcript, provide 3 key suggestions to improve the session:\n\n${transcription.text}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    fs.unlinkSync(audioPath); // delete temp file

    res.json({
      transcript: transcription.text,
      suggestions: response.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process audio." });
  }
});

export default router;
