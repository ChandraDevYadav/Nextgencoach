import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema({
  botId: String,
  meetingUrl: String,
  transcript: [
    {
      speaker: String,
      text: String,
      timestamp: Date,
    },
  ],
});

export default mongoose.model("Transcript", transcriptSchema);
