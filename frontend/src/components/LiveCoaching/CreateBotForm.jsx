import React, { useState } from "react";
import axios from "axios";

const CreateBotForm = () => {
  const [meetingUrl, setMeetingUrl] = useState("");
  const [botName, setBotName] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://api.testir.xyz/server26/api/bot/create-bot",
        {
          meetingUrl,
          botName,
        }
      );
      setResponse(res.data);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Meeting URL"
          value={meetingUrl}
          onChange={(e) => setMeetingUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Bot Name"
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
          required
        />
        <button type="submit">Create Bot</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default CreateBotForm;
