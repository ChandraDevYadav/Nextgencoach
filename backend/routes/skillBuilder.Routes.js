import express from 'express';
import {
  getSkillBuilderSessions,
  getSkillBuilderSessionById,
  createSkillBuilderSession,
  addConversationMessage,
  generateSkillBuilderFeedback
} from '../controllers/skillBuilderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getSkillBuilderSessions)
  .post(protect, createSkillBuilderSession);

router.route('/:id')
  .get(protect, getSkillBuilderSessionById);

router.route('/:id/message')
  .post(protect, addConversationMessage);

router.route('/:id/feedback')
  .post(protect, generateSkillBuilderFeedback);

export default router;
