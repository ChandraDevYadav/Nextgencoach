import fs from "fs";
import path from "path";
import axios from "axios";

export const handleZoomWebhook = async (req, res) => {
  const { event, payload } = req.body;

  if (event === "recording.completed") {
    const downloadUrl = payload.object.recording_files[0].download_url;
    const accessToken = await getZoomAccessToken();

    const audioResponse = await axios.get(downloadUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
      responseType: "arraybuffer",
    });

    // Save or stream to transcription API (e.g., Whisper)
    const transcript = await transcribeAudio(audioResponse.data); // Your Whisper/OpenAI/AssemblyAI handler

    // Save transcript to DB (MongoDB)
    await Transcript.create({
      meetingId: payload.object.id,
      transcript,
      summary: summarizeText(transcript), // Optional
    });

    res.sendStatus(200);
  } else {
    res.sendStatus(200);
  }
};
