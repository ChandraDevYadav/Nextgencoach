import Transcript from "../models/Transcript.Model.js";

export const receiveTranscript = async (req, res) => {
  const { bot_id, meeting_url, transcript } = req.body;

  try {
    let existingTranscript = await Transcript.findOne({ botId: bot_id });

    if (existingTranscript) {
      existingTranscript.transcript.push(...transcript);
      await existingTranscript.save();
    } else {
      await Transcript.create({
        botId: bot_id,
        meetingUrl: meeting_url,
        transcript,
      });
    }

    res.status(200).send("Transcript received");
  } catch (error) {
    console.error("Error saving transcript:", error);
    res.status(500).send("Error saving transcript");
  }
};

export const getTranscripts = async (req, res) => {
  try {
    const transcripts = await Transcript.find();
    res.status(200).json(transcripts);
  } catch (error) {
    console.error("Error fetching transcripts:", error);
    res.status(500).send("Error fetching transcripts");
  }
};
