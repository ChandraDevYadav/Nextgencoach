import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema(
  {
    zoomId: String,
    transcript: String,
    summary: String,
    preQuestionAnalysis: String, // NEW field
  },
  { timestamps: true }
);

export default mongoose.model("Transcript", transcriptSchema);
