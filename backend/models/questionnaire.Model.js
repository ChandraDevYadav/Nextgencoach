import mongoose from "mongoose";

const questionnaireSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // updated from 'Client' to 'User'
      required: false,
    },
    type: {
      type: String,
      enum: ["pre-session", "post-session", "feedback", "intake"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    questions: [
      {
        questionText: String,
        answer: String,
      },
    ],
    isTemplate: {
      type: Boolean,
      default: false,
    },
    templateName: {
      type: String,
    },
    status: {
      type: String,
      enum: ["draft", "sent", "completed"],
      default: "draft",
    },
    sentDate: {
      type: Date,
    },
    completedDate: {
      type: Date,
    },
    aiPrepReport: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);

export default Questionnaire;
