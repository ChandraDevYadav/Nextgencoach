import mongoose from "mongoose";

const audioSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Audio = mongoose.model("Audio", audioSchema);
