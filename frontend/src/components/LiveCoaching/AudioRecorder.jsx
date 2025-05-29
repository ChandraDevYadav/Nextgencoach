import React, { useState, useRef } from "react";

const AudioRecorder = ({ onTranscription }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("audio", audioBlob);

      const res = await fetch("http://localhost:5000/api/audio/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      onTranscription(data.transcript, data.suggestions);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded font-semibold ${
          recording ? "bg-red-600" : "bg-green-600"
        } text-white`}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
};

export default AudioRecorder;
