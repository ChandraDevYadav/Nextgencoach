import asyncHandler from "express-async-handler";
import SkillBuilderSession from "../models/skillBuilderSession.Model.js";
import { generateSkillBuilderFeedback as generateSkillBuilderFeedbackFromAI } from "../services/aiService.js";

const getSkillBuilderSessions = asyncHandler(async (req, res) => {
  const sessions = await SkillBuilderSession.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(sessions);
});

const getSkillBuilderSessionById = asyncHandler(async (req, res) => {
  const session = await SkillBuilderSession.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (session) {
    res.json(session);
  } else {
    res.status(404);
    throw new Error("Skill builder session not found");
  }
});

const createSkillBuilderSession = asyncHandler(async (req, res) => {
  const { avatarSettings } = req.body;

  const session = new SkillBuilderSession({
    user: req.user._id,
    avatarSettings,
  });

  const createdSession = await session.save();
  res.status(201).json(createdSession);
});

const addConversationMessage = asyncHandler(async (req, res) => {
  const { role, content } = req.body;

  const session = await SkillBuilderSession.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (session) {
    session.conversation.push({
      role,
      content,
      timestamp: new Date(),
    });

    const updatedSession = await session.save();
    res.json(updatedSession);
  } else {
    res.status(404);
    throw new Error("Skill builder session not found");
  }
});

const generateSkillBuilderFeedback = asyncHandler(async (req, res) => {
  const session = await SkillBuilderSession.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (session) {
    if (session.conversation.length === 0) {
      res.status(400);
      throw new Error("No conversation to generate feedback from");
    }

    try {
      const feedback = await generateSkillBuilderFeedbackFromAI(session);
      session.feedback = feedback;
      session.duration = Math.floor((new Date() - session.createdAt) / 60000);
      await session.save();
      res.json({ feedback });
    } catch (error) {
      console.error(error);
      res.status(500);
      throw new Error("Failed to generate skill builder feedback");
    }
  } else {
    res.status(404);
    throw new Error("Skill builder session not found");
  }
});

export {
  getSkillBuilderSessions,
  getSkillBuilderSessionById,
  createSkillBuilderSession,
  addConversationMessage,
  generateSkillBuilderFeedback,
};
