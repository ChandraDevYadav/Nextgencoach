import express from "express";
import {
  getQuestionnaires,
  getQuestionnaireById,
  createQuestionnaire,
  updateQuestionnaire,
  sendQuestionnaire,
  generatePrepReport,
  getQuestionnaireTemplates,
} from "../controllers/questionnaireController.js";
import { protect } from "../middleware/auth.Middleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getQuestionnaires)
  .post(protect, createQuestionnaire);

router.route("/templates").get(protect, getQuestionnaireTemplates);

router
  .route("/:id")
  .get(protect, getQuestionnaireById)
  .put(protect, updateQuestionnaire);

router.route("/:id/send").post(protect, sendQuestionnaire);

router.route("/:id/report").post(protect, generatePrepReport);

export default router;
