import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import Report from "../models/report.Model.js";

export const uploadAudioAndGenerateReport = async (req, res) => {
  try {
    const filePath = req.file.path;

    // Transcription
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));
    formData.append("model", "whisper-1");

    const whisperRes = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          ...formData.getHeaders(),
        },
      }
    );

    const transcript = whisperRes.data.text;

    // Generate Report
    const gptRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a strategic coaching intelligence assistant...",
          },
          {
            role: "user",
            content: `Generate a coaching debrief report using only the transcript provided. Transcript:\n\n${transcript}`,
          },
        ],
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      }
    );

    const report = gptRes.data.choices[0].message.content;

    const newReport = new Report({
      sessionId: req.body.sessionId,
      transcript,
      report,
    });
    await newReport.save();

    res.json({ transcript, report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
