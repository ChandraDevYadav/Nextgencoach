import mongoose from "mongoose";
import LiveCoachingSession from "../models/liveCoaching.Model.js";

export const createSession = async (req, res) => {
  try {
    const session = await LiveCoachingSession.create(req.body);
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getSessionById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid session ID" });
    }

    const session = await LiveCoachingSession.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    res.json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateSuggestions = async (req, res) => {
  try {
    const session = await LiveCoachingSession.findByIdAndUpdate(
      req.params.id,
      { suggestedQuestions: req.body.suggestedQuestions },
      { new: true }
    );
    res.json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateSessionSummary = async (req, res) => {
  try {
    const session = await LiveCoachingSession.findByIdAndUpdate(
      req.params.id,
      { sessionSummary: req.body.sessionSummary },
      { new: true }
    );
    res.json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const addCoachFeedback = async (req, res) => {
  try {
    const session = await LiveCoachingSession.findByIdAndUpdate(
      req.params.id,
      { coachingFeedback: req.body.coachingFeedback },
      { new: true }
    );
    res.json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
