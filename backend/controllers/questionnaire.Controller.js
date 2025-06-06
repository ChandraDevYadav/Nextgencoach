import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Questionnaire from "../models/questionnaire.Model.js";
import User from "../models/user.Model.js";
import { generateAIPrepReport } from "../services/aiService.js";
import { sendQuestionnaireEmail } from "../services/emailService.js";

const getQuestionnaires = asyncHandler(async (req, res) => {
  const questionnaires = await Questionnaire.find({
    user: req.user._id,
  }).populate("client", "name email");
  res.json(questionnaires);
});

const getQuestionnaireById = asyncHandler(async (req, res) => {
  const questionnaire = await Questionnaire.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("client", "name email");

  if (questionnaire) {
    res.json(questionnaire);
  } else {
    res.status(404);
    throw new Error("Questionnaire not found");
  }
});

const createQuestionnaire = asyncHandler(async (req, res) => {
  const { type, title, questions, isTemplate, templateName } = req.body;

  const questionnaire = new Questionnaire({
    user: req.user._id,
   // client: "68297ae5c1eb1f6920c1f228", //placeholerd client ID
    type,
    title,
    questions,
    isTemplate,
    templateName: isTemplate ? templateName : null,
  });

  const createdQuestionnaire = await questionnaire.save();
  res.status(201).json(createdQuestionnaire);
});

const updateQuestionnaire = asyncHandler(async (req, res) => {
  const { title, questions, status } = req.body;

  const questionnaire = await Questionnaire.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (questionnaire) {
    questionnaire.title = title || questionnaire.title;
    questionnaire.questions = questions || questionnaire.questions;
    questionnaire.status = status || questionnaire.status;

    if (status === "completed" && !questionnaire.completedDate) {
      questionnaire.completedDate = new Date();
    }

    const updatedQuestionnaire = await questionnaire.save();
    res.json(updatedQuestionnaire);
  } else {
    res.status(404);
    throw new Error("Questionnaire not found");
  }
});

const sendQuestionnaire = asyncHandler(async (req, res) => {
  const questionnaire = await Questionnaire.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("client", "name email");

  if (questionnaire) {
    if (questionnaire.status === "sent") {
      res.status(400);
      throw new Error("Questionnaire already sent");
    }

    questionnaire.status = "sent";
    questionnaire.sentDate = new Date();
    await questionnaire.save();

    try {
      await sendQuestionnaireEmail(questionnaire, req.user);
      res.json({ message: "Questionnaire sent successfully" });
    } catch (error) {
      res.status(500);
      throw new Error("Failed to send questionnaire email");
    }
  } else {
    res.status(404);
    throw new Error("Questionnaire not found");
  }
});

const getCompletedQuestionnaires = asyncHandler(async (req, res) => {
  const results = await Questionnaire.find({
    user: req.user._id,
    status: "completed",
  })
    .populate("client", "name email")
    .select("client completedDate title status questions");

  const formattedResults = results.map((q) => ({
    _id: q._id,
    name: q.client.name,
    date: q.completedDate?.toISOString().split("T")[0],
    form: q.title,
    status: q.status,
    answers: q.questions.map((q) => ({
      question: q.question,
      answer: q.answer,
    })),
  }));

  res.json(formattedResults);
});


const generatePrepReport = asyncHandler(async (req, res) => {
  const questionnaire = await Questionnaire.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("client", "name email");

  if (questionnaire) {
    if (questionnaire.status !== "completed") {
      res.status(400);
      throw new Error("Questionnaire must be completed to generate report");
    }

    try {
      const aiReport = await generateAIPrepReport(questionnaire);
      questionnaire.aiPrepReport = aiReport;
      await questionnaire.save();
      res.json({ aiPrepReport: aiReport });
    } catch (error) {
      res.status(500);
      throw new Error("Failed to generate AI prep report");
    }
  } else {
    res.status(404);
    throw new Error("Questionnaire not found");
  }
});

const getQuestionnaireTemplates = asyncHandler(async (req, res) => {
  const templates = await Questionnaire.find({
    user: req.user._id,
    isTemplate: true,
  });
  res.json(templates);
});

export {
  getQuestionnaires,
  getQuestionnaireById,
  createQuestionnaire,
  updateQuestionnaire,
  sendQuestionnaire,
  getCompletedQuestionnaires,
  generatePrepReport,
  getQuestionnaireTemplates,
};
