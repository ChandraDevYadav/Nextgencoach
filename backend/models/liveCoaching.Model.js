import mongoose from "mongoose";

const suggestedQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  status: { type: String, enum: ["held", "released"], default: "held" },
});

const sessionSummarySchema = new mongoose.Schema({
  breakthroughs: String,
  topicsCovered: String,
  clientCommitments: String,
  reflectiveQuestions: String,
});

const coachingFeedbackSchema = new mongoose.Schema({
  strengths: String,
  missedOpportunities: String,
  suggestions: String,
  privateNotes: String,
});

const liveCoachingSessionSchema = new mongoose.Schema(
  {
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    zoomSessionLink: String,
    prepNotes: String,
    suggestedQuestions: [suggestedQuestionSchema],
    aiNoteTakerEnabled: { type: Boolean, default: false },
    sessionSummary: sessionSummarySchema,
    coachingFeedback: coachingFeedbackSchema,
  },
  { timestamps: true }
);

export default mongoose.model("LiveCoachingSession", liveCoachingSessionSchema);
