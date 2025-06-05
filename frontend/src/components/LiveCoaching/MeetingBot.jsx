import React, { useState } from "react";
import axios from "axios";

const MeetingBot = () => {
  const [meetingUrl, setMeetingUrl] = useState("");
  const [botId, setBotId] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const createBot = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/bots");
      setBotId(response.data.id);
      alert("Bot created successfully!");
    } catch (error) {
      console.error("Error creating bot:", error);
    } finally {
      setLoading(false);
    }
  };

  const processMeeting = async () => {
    if (!meetingUrl || !botId) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/process-meeting",
        {
          meetingUrl,
          botId,
        }
      );
      setMeetingId(response.data.meeting_id);
      alert("Meeting processing started!");
    } catch (error) {
      console.error("Error processing meeting:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async () => {
    if (!meetingId) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.testir.xyz/server26/api/meetings/${meetingId}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Meeting Bot</h2>

      <button onClick={createBot} disabled={loading}>
        {loading ? "Creating..." : "Create Bot"}
      </button>

      <div>
        <input
          type="text"
          value={meetingUrl}
          onChange={(e) => setMeetingUrl(e.target.value)}
          placeholder="Enter meeting URL"
        />
        <button onClick={processMeeting} disabled={!botId || loading}>
          {loading ? "Processing..." : "Process Meeting"}
        </button>
      </div>

      {meetingId && (
        <button onClick={fetchResults} disabled={loading}>
          {loading ? "Fetching..." : "Get Results"}
        </button>
      )}

      {results && (
        <div>
          <h3>Transcription</h3>
          <pre>{JSON.stringify(results.transcription, null, 2)}</pre>

          <h3>Summary</h3>
          <pre>{JSON.stringify(results.summary, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MeetingBot;
