import React, { useEffect, useState } from "react";
import axios from "axios";

const LiveTranscript = () => {
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    const fetchLiveTranscript = async () => {
      try {
        // If using Vite:
        const res = await axios.get(
          "http://localhost:5000/api/transcript/transcripts"
        );

        // If using Create React App, ensure REACT_APP_API_URL is defined in your .env file and keep using process.env.REACT_APP_API_URL
        setTranscript(res.data);
      } catch (err) {
        console.error("Error fetching live transcript:", err);
      }
    };

    const interval = setInterval(fetchLiveTranscript, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Live Transcript</h2>
      {transcript.map((entry, index) => (
        <div key={index}>
          <strong>{entry.speaker}:</strong> {entry.text}
        </div>
      ))}
    </div>
  );
};

export default LiveTranscript;
