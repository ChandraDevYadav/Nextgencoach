import express from "express";
import { protect, protectCoach } from "../middleware/auth.Middleware.js";
import { analyzePreQuestions } from "../controllers/preQuestion.Controller.js";

const router = express.Router();
router.post("/prequestions", protect, protectCoach, analyzePreQuestions);

export default router;
