import asyncHandler from "express-async-handler";
import Questionnaire from "../models/questionnaire.Model.js";
import Client from "../models/client.Model.js";
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
  const { client, type, title, questions, isTemplate, templateName } = req.body;

  const clientExists = await Client.findOne({
    _id: client,
    user: req.user._id,
  });
  if (!clientExists && !isTemplate) {
    res.status(400);
    throw new Error("Client not found");
  }

  const questionnaire = new Questionnaire({
    user: req.user._id,
    client: isTemplate ? null : client,
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
  generatePrepReport,
  getQuestionnaireTemplates,
};
