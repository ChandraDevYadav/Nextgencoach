import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/auth.Controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/profile", getUser);

export default router;
