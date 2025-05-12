import express from "express";
import multer from "multer";
import {
  getClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
  uploadClientAvatar,
} from "../controllers/clientController.js";
import { protect } from "../middleware/auth.Middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/avatars/" });

router.route("/").get(protect, getClients).post(protect, createClient);

router
  .route("/:id")
  .get(protect, getClientById)
  .put(protect, updateClient)
  .delete(protect, deleteClient);

router
  .route("/:id/avatar")
  .post(protect, upload.single("avatar"), uploadClientAvatar);

export default router;
