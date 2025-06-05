import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// ✅ Update this with your server URL if deploying
const socket = io("http://localhost:5000");

export default function AudioRecorder() {
  const mediaRecorderRef = useRef(null);
  const screenStreamRef = useRef(null);
  const audioStreamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [summary, _setSummary] = useState("Summary will appear here...");
  const [botStatus, setBotStatus] = useState(""); // 🆕 For Recall bot feedback

  useEffect(() => {
    socket.on("transcription", (text) => {
      setTranscription((prev) => (prev ? prev + "\n" + text : text));
    });

    socket.on("ai-suggestion", (suggestion) => {
      setAiSuggestion(suggestion);
    });

    socket.on("bot-started", (data) => {
      setBotStatus(`Bot joined meeting successfully! Bot ID: ${data.bot_id}`);
    });

    socket.on("bot-error", (error) => {
      setBotStatus(`❌ Failed to start bot: ${error}`);
    });

    return () => {
      socket.off("transcription");
      socket.off("ai-suggestion");
      socket.off("bot-started");
      socket.off("bot-error");
      stopRecording();
    };
  }, []);

  const startScreenAndAudioRecording = async () => {
    setTranscription("");
    setAiSuggestion("");
    setBotStatus("");
    setIsRecording(true);

    // Prompt for Recall Bot info
    const meeting_url = prompt("Enter meeting URL:");
    const platform = prompt("Enter platform (e.g., zoom, google_meet):");

    if (!meeting_url || !platform) {
      alert("Please provide both meeting URL and platform.");
      setIsRecording(false);
      return;
    }

    // Emit bot start
    socket.emit("start-recall-bot", { meeting_url, platform });

    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      screenStreamRef.current = screenStream;
      audioStreamRef.current = audioStream;

      const combinedStream = new MediaStream([
        ...screenStream.getVideoTracks(),
        ...screenStream.getAudioTracks(),
        ...audioStream.getAudioTracks(),
      ]);

      let options = {};
      if (MediaRecorder.isTypeSupported("video/webm; codecs=vp8,opus")) {
        options = { mimeType: "video/webm; codecs=vp8,opus" };
      }

      const mediaRecorder = new MediaRecorder(combinedStream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          socket.emit("screen-audio-chunk", event.data);
        }
      };

      mediaRecorder.start(300);

      screenStream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };
    } catch (err) {
      console.error("Error accessing media devices.", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);

    if (mediaRecorderRef.current) {
      try {
        mediaRecorderRef.current.stop();
      } catch (err) {
        console.error("Error stopping MediaRecorder:", err);
      }
      mediaRecorderRef.current = null;
    }

    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }

    socket.emit("stop-recording");
  };

  return (
    <div className="px-32 pt-12">
      <div className="flex justify-start gap-4 mb-4">
        <button
          onClick={startScreenAndAudioRecording}
          disabled={isRecording}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Stop Recording
        </button>
      </div>

      {botStatus && (
        <p className="mb-4 text-sm text-indigo-600 font-medium">{botStatus}</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div>
          <h3 className="font-semibold text-lg mb-2 text-blue-600">
            Live Transcription
          </h3>
          <div className="bg-gray-100 p-4 rounded min-h-[150px]">
            <pre className="whitespace-pre-wrap text-sm">
              {transcription || "Waiting for transcription..."}
            </pre>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2 text-blue-600">
            AI Suggestion
          </h3>
          <div className="bg-blue-100 p-4 rounded min-h-[150px]">
            <p className="text-sm">
              {aiSuggestion || "Waiting for AI suggestions..."}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2 text-green-600">Summary</h3>
          <div className="bg-green-100 p-4 rounded min-h-[150px]">
            <p className="text-sm">{summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
