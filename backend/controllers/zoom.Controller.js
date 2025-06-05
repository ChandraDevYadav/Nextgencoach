import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const getZoomAccessToken = async () => {
  const tokenUrl = "https://zoom.us/oauth/token";
  const authHeader = Buffer.from(
    `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
  ).toString("base64");

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
};

export const createZoomMeeting = async (req, res) => {
  try {
    const accessToken = await getZoomAccessToken();

    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic: req.body.topic || "Coaching Session",
        type: 1,
        password: "123456",
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
    res.json({ meetingNumber: id, joinUrl: join_url, password });
  } catch (err) {
    res.status(500).json({ message: "Failed to create meeting" });
  }
};

export const generateZoomSignature = (req, res) => {
  const { meetingNumber, role } = req.body;
  const sdkKey = process.env.ZOOM_CLIENT_ID;
  const sdkSecret = process.env.ZOOM_CLIENT_SECRET;
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(
    `${sdkKey}${meetingNumber}${timestamp}${role}`
  ).toString("base64");
  const hash = crypto
    .createHmac("sha256", sdkSecret)
    .update(msg)
    .digest("base64");
  const signature = Buffer.from(
    `${sdkKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
  ).toString("base64");
  res.json({ signature });
};
