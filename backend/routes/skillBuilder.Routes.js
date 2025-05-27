import express from "express";
import {
  createAvatar,
  getAvatarsByUser,
  getAvatarById,
  deleteAvatar,
} from "../controllers/skillAvatar.Controller.js";
import { protect } from "../middleware/auth.Middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createAvatar);
router.get("/", getAvatarsByUser);
router.get("/:id", getAvatarById);
router.delete("/:id", deleteAvatar);

export default router;
