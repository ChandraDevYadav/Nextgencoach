import {
  createBot,
  processMeeting,
  getTranscription,
  getSummary,
} from "../services/recallService.js";

export const createMeetingBot = async (req, res) => {
  try {
    const botData = {
      name: "MERN Meeting Assistant",
      transcription_options: {
        engine: "assembly_ai",
        generate_summary: true,
        generate_chapters: true,
        generate_suggestions: true,
      },
      real_time_transcription: {
        destination_url: `${process.env.BACKEND_URL}/api/transcription-webhook`,
      },
      summary_options: {
        format: "bullet_points",
        length: "medium",
      },
    };

    const bot = await createBot(botData);
    res.status(201).json(bot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const startMeetingProcessing = async (req, res) => {
  try {
    const { meetingUrl, botId } = req.body;
    const result = await processMeeting(meetingUrl, botId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchMeetingData = async (req, res) => {
  try {
    const { meetingId } = req.params;

    const [transcription, summary] = await Promise.all([
      getTranscription(meetingId),
      getSummary(meetingId),
    ]);

    res.status(200).json({
      transcription,
      summary,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
