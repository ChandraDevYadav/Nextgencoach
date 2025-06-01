import axios from "axios";
import dotenv from "dotenv";
import qs from "qs";
dotenv.config();

const getZoomAccessToken = async () => {
  const tokenUrl = "https://zoom.us/oauth/token";
  const authHeader = Buffer.from(
    `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.post(
      `${tokenUrl}?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`,
      {},
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Failed to get Zoom access token", error.response?.data);
    throw new Error("Zoom authorization failed");
  }
};

export const createZoomMeeting = async (req, res) => {
  try {
    const accessToken = await getZoomAccessToken();

    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic: "NextGen Coaching Session",
        type: 1,
        password: "coach123",
        settings: {
          host_video: true,
          participant_video: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { id, join_url, password } = response.data;
    res.status(200).json({
      meetingNumber: id,
      joinUrl: join_url,
      password,
    });
  } catch (err) {
    console.error(
      "Error creating Zoom meeting:",
      err.response?.data || err.message
    );
    res.status(500).json({ message: "Failed to create Zoom meeting" });
  }
};
