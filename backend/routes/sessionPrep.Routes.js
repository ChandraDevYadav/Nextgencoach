import express from "express";
import {
  createQuestionnaireTemplate,
  getQuestionnaireTemplates,
  sendPreSessionQuestionnaire,
  submitResponses,
  getSessionPrepById,
  getSessionPreparations,
} from "../controllers/sessionPrep.Controller.js";
import { protect } from "../middleware/auth.Middleware.js";

const router = express.Router();

// Templates
router.post("/template", protect, createQuestionnaireTemplate);
router.get("/template", protect, getQuestionnaireTemplates);

// Questionnaires
router.post("/send", protect, sendPreSessionQuestionnaire);
router.post("/submit/:id", protect, submitResponses);
router.get("/:id", protect, getSessionPrepById);
router.get("/", protect, getSessionPreparations);

export default router;
