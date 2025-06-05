import { useState } from "react";
import axios from "axios";

const StartBotForm = () => {
  const [meetingUrl, setMeetingUrl] = useState("");
  const [platform, setPlatform] = useState("zoom");

  const handleStartBot = async () => {
    try {
      const res = await axios.post(
        "https://api.testir.xyz/server26/api/recall/start-bot",
        {
          joinUrl: meetingUrl,
          platform,
        }
      );
      console.log("Bot started:", res.data);
    } catch (err) {
      console.error("Failed to start bot:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <input
        value={meetingUrl}
        onChange={(e) => setMeetingUrl(e.target.value)}
        placeholder="Meeting URL"
      />
      <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
        <option value="zoom">Zoom</option>
        <option value="google_meet">Google Meet</option>
      </select>
      <button onClick={handleStartBot}>Start Bot</button>
    </div>
  );
};

export default StartBotForm;
