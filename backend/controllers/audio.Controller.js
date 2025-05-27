import fs from "fs";
import { transcribeAudio } from "../utils/whisper.js";
import { getAIResponse } from "../utils/openai.js";

export const handleAudioUpload = async (req, res) => {
  try {
    const audioPath = req.file.path;
    const transcript = await transcribeAudio(audioPath);
    const aiResponse = await getAIResponse(transcript);

    fs.unlinkSync(audioPath); // cleanup

    res.json({ transcript, aiResponse });
  } catch (err) {
    res.status(500).json({ error: "Processing failed", details: err.message });
  }
};
