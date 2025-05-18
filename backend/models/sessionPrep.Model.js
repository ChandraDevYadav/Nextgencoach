import mongoose from "mongoose";

const QuestionnaireTemplateSchema = new mongoose.Schema({
  coach: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["intake", "pre-session", "post-session", "feedback"],
    required: true,
  },
  questions: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
});

const SessionPreparationSchema = new mongoose.Schema({
  coach: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questionnaireTemplate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionnaireTemplate",
  },
  responses: [
    {
      question: String,
      answer: String,
    },
  ],
  aiPrepReport: {
    title: String,
    summary: String,
    type: String,
    questionsToAsk: [String],
    focusThemes: [String],
    clientPatterns: [String],
  },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const QuestionnaireTemplate = mongoose.model(
  "QuestionnaireTemplate",
  QuestionnaireTemplateSchema
);
const SessionPreparation = mongoose.model(
  "SessionPreparation",
  SessionPreparationSchema
);

export { QuestionnaireTemplate, SessionPreparation };
