import axios from "axios";
import FormData from "form-data";

const RECALL_API_KEY = process.env.RECALL_API_KEY;
const RECALL_API_URL = "https://us-east-2.api.recall.ai/api/v1";

const recallApi = axios.create({
  baseURL: RECALL_API_URL,
  headers: {
    Authorization: `Token ${RECALL_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const createBot = async (botData) => {
  try {
    const response = await recallApi.post("/bots/", botData);
    return response.data;
  } catch (error) {
    console.error("Error creating bot:", error.response?.data || error.message);
    throw error;
  }
};

export const processMeeting = async (meetingUrl, botId) => {
  try {
    const form = new FormData();
    form.append("meeting_url", meetingUrl);
    form.append("bot_id", botId);

    const response = await recallApi.post("/bot/process_meeting/", form, {
      headers: form.getHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error processing meeting:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getTranscription = async (meetingId) => {
  try {
    const response = await recallApi.get(`/meetings/${meetingId}/transcript/`);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting transcription:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSummary = async (meetingId) => {
  try {
    const response = await recallApi.get(`/meetings/${meetingId}/summary/`);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting summary:",
      error.response?.data || error.message
    );
    throw error;
  }
};
