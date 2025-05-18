import {
  QuestionnaireTemplate,
  SessionPreparation,
} from "../models/sessionPrep.Model.js";
import User from "../models/user.Model.js";

export const createQuestionnaireTemplate = async (req, res) => {
  try {
    const { title, type, questions } = req.body;
    const coachId = req.user._id;

    const template = await QuestionnaireTemplate.create({
      coach: coachId,
      title,
      type,
      questions,
    });

    res.status(201).json(template);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create template", error: error.message });
  }
};

export const getQuestionnaireTemplates = async (req, res) => {
  try {
    const coachId = req.user._id;
    const templates = await QuestionnaireTemplate.find({ coach: coachId });
    res.json(templates);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch templates", error: error.message });
  }
};

export const sendPreSessionQuestionnaire = async (req, res) => {
  try {
    const coachId = req.user._id;
    const clientId = req.body.clientId || req.user._id;
    const { questionnaireTemplateId } = req.body;

    console.log("coachId:", coachId);
    console.log("clientId:", clientId);
    console.log("questionnaireTemplateId:", questionnaireTemplateId);

    const client = await User.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Debug: check if template exists ignoring coach filter
    const templateCheck = await QuestionnaireTemplate.findById(
      questionnaireTemplateId
    );
    if (!templateCheck) {
      return res
        .status(404)
        .json({ message: "Questionnaire template not found at all" });
    }

    // Now the real query
    const template = await QuestionnaireTemplate.findOne({
      _id: questionnaireTemplateId,
      coach: coachId,
    });
    if (!template) {
      return res
        .status(404)
        .json({
          message: "Questionnaire template not found or coach mismatch",
        });
    }

    // rest of your logic...
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send questionnaire", error: error.message });
  }
};

export const submitResponses = async (req, res) => {
  try {
    const sessionPrepId = req.params.id;
    const { responses } = req.body;

    const sessionPrep = await SessionPreparation.findById(sessionPrepId);
    if (!sessionPrep)
      return res.status(404).json({ message: "Session preparation not found" });

    if (sessionPrep.client.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to submit responses" });
    }

    sessionPrep.responses = responses;
    sessionPrep.status = "completed";
    sessionPrep.updatedAt = new Date();

    sessionPrep.aiPrepReport = {
      title: "Leadership Development Focus Areas",
      summary:
        "Analysis of delegation challenges and team trust building opportunities.",
      type: sessionPrep.questionnaireTemplate?.type || "Pre-Session Analysis",
      questionsToAsk: [
        "What motivates you?",
        "What challenges are you facing currently?",
        "What goals do you want to achieve?",
        "How do you prefer to receive feedback?",
      ],
      focusThemes: ["Motivation", "Goal Setting", "Stress Management"],
      clientPatterns: ["Tends to avoid conflict", "Seeks reassurance often"],
    };

    await sessionPrep.save();
    res.json({ message: "Responses submitted successfully", sessionPrep });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to submit responses", error: error.message });
  }
};

export const getSessionPrepById = async (req, res) => {
  try {
    const sessionPrepId = req.params.id;
    const coachId = req.user._id;

    const sessionPrep = await SessionPreparation.findById(sessionPrepId)
      .populate("client", "name email image")
      .populate("questionnaireTemplate", "title type questions");

    if (!sessionPrep)
      return res.status(404).json({ message: "Session preparation not found" });

    if (sessionPrep.coach.toString() !== coachId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this session preparation" });
    }

    res.json(sessionPrep);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get session preparation",
      error: error.message,
    });
  }
};

export const getSessionPreparations = async (req, res) => {
  try {
    const coachId = req.user._id;

    const sessions = await SessionPreparation.find({ coach: coachId })
      .populate("client", "name email")
      .populate("questionnaireTemplate", "title type")
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get session preparations",
      error: error.message,
    });
  }
};
