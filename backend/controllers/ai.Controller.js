import { Configuration, OpenAIApi } from ("openai");
import fs from "fs";
import path from "path";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.processAudio = async (req, res) => {
  try {
    const audioPath = req.file.path;

    // Convert audio to text using OpenAI's Whisper API
    const transcription = await openai.createTranscription(
      fs.createReadStream(audioPath),
      "whisper-1"
    );

    const userText = transcription.data.text;

    // Generate AI response using ChatGPT
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userText }],
    });

    const aiResponse = chatCompletion.data.choices[0].message.content;

    // Clean up uploaded file
    fs.unlinkSync(audioPath);

    res.json({ transcription: userText, aiResponse });
  } catch (error) {
    console.error("Error processing audio:", error);
    res.status(500).json({ error: "Failed to process audio." });
  }
};
