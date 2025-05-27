import axios from "axios";
import jwt from "jsonwebtoken";

exports.createMeeting = async (req, res) => {
  try {
    const payload = {
      iss: process.env.ZOOM_API_KEY,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };
    const token = jwt.sign(payload, process.env.ZOOM_API_SECRET);

    const meetingConfig = {
      topic: "Live Coaching Session",
      type: 1,
      settings: {
        host_video: true,
        participant_video: true,
      },
    };

    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      meetingConfig,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      join_url: response.data.join_url,
      meeting_id: response.data.id,
    });
  } catch (error) {
    console.error("Error creating Zoom meeting:", error);
    res.status(500).json({ error: "Failed to create Zoom meeting." });
  }
};
