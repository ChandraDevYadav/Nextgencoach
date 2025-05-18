import mongoose from "mongoose";

const skillAvatarSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ageRange: {
      type: String,
      enum: ["18-25", "26-35", "36-45", "46+"],
      required: true,
    },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    profession: { type: String, required: true },

    communicationStyle: { type: String, required: true },
    opennessToCoaching: {
      type: String,
      enum: ["Low", "Neutral", "High"],
      required: true,
    },
    emotionalState: { type: String, required: true },

    primaryChallenge: { type: String, required: true },
    goals: { type: String, required: true },
    conversationDifficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Hard"],
      required: true,
    },

    name: { type: String, required: true },
    voice: { type: String, enum: ["Male", "Female"], required: true },
  },
  { timestamps: true }
);

const SkillAvatar = mongoose.model("SkillAvatar", skillAvatarSchema);
export default SkillAvatar;
