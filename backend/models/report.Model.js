import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  sessionId: String,
  transcript: String,
  report: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Report", reportSchema);
