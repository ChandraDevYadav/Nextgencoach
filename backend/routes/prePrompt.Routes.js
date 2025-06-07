import express from "express";
import { protect, protectCoach } from "../middleware/auth.Middleware.js";
import { generatePreQuestions } from "../controllers/prePrompt.Controller.js";

const router = express.Router();
router.post("/generate-questions", protect, protectCoach, generatePreQuestions);

export default router;
