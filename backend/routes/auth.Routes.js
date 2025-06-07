import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/auth.Controller.js";
import { protect } from "../middleware/auth.Middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/profile", protect, getUser);

export default router;
