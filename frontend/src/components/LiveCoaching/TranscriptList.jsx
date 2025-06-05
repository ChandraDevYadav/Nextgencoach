import React, { useEffect, useState } from "react";
import axios from "axios";

const TranscriptList = () => {
  const [transcripts, setTranscripts] = useState([]);

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/transcript/transcripts"
        );
        setTranscripts(res.data);
      } catch (err) {
        console.error("Error fetching transcripts:", err);
      }
    };

    fetchTranscripts();
  }, []);

  return (
    <div>
      <h2>Transcripts</h2>
      {transcripts.map((transcript) => (
        <div key={transcript._id}>
          <h3>{transcript.meetingUrl}</h3>
          <ul>
            {transcript.transcript.map((entry, index) => (
              <li key={index}>
                <strong>{entry.speaker}:</strong> {entry.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TranscriptList;
