import express from "express";
import {
  getQuestionnaires,
  getQuestionnaireById,
  createQuestionnaire,
  updateQuestionnaire,
  sendQuestionnaire,
  getCompletedQuestionnaires,
  generatePrepReport,
  getQuestionnaireTemplates,
} from "../controllers/questionnaire.Controller.js";
import { protect } from "../middleware/auth.Middleware.js";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
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

router.route("/results").get(protect, getCompletedQuestionnaires);

router.route("/:id/report").post(protect, generatePrepReport);

export default router;
