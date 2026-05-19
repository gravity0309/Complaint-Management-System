import express from "express";
import { analyzeComplaintText } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/analyze", protect, analyzeComplaintText);

export default router;
