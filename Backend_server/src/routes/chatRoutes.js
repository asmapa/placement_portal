import express from "express";
import { chatWithBot } from "../controller/chatController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/chat", authenticateToken, chatWithBot);

export default router;
