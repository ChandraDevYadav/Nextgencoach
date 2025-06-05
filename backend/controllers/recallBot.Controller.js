import axios from "axios";

const RECALL_API_KEY = process.env.RECALL_API_KEY;

export const startRecallBot = async (req, res) => {
  const { meeting_url, platform } = req.body;

  try {
    const response = await axios.post(
      "https://api.recall.ai/api/v1/bot",
      {
        meeting_url,
        platform, // e.g., 'zoom', 'google_meet'
      },
      {
        headers: {
          Authorization: `Token ${RECALL_API_KEY}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to start bot" });
  }
};
