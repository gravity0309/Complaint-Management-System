import { analyzeComplaint } from "../services/aiService.js";
import asyncHandler from "../utils/asyncHandler.js";

export const analyzeComplaintText = asyncHandler(async (req, res) => {
  const { title, description, category, location } = req.body;

  if (!title || !description || !category || !location) {
    const error = new Error("Title, description, category, and location are required");
    error.statusCode = 400;
    throw error;
  }

  const analysis = await analyzeComplaint(req.body);
  res.json({ analysis });
});
