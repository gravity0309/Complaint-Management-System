import Complaint from "../models/Complaint.js";
import { analyzeComplaint } from "../services/aiService.js";
import asyncHandler from "../utils/asyncHandler.js";

const buildComplaintFilters = (query) => {
  const filters = {};

  if (query.category) filters.category = query.category;
  if (query.status) filters.status = query.status;
  if (query.location) filters.location = { $regex: query.location, $options: "i" };

  return filters;
};

export const createComplaint = asyncHandler(async (req, res) => {
  const aiAnalysis = await analyzeComplaint(req.body);
  const complaint = await Complaint.create({
    ...req.body,
    aiAnalysis,
    createdBy: req.user?._id
  });

  res.status(201).json({ complaint, aiAnalysis });
});

export const getComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find(buildComplaintFilters(req.query))
    .populate("createdBy", "name email role")
    .sort({ createdAt: -1 });

  res.json({ complaints });
});

export const searchComplaints = asyncHandler(async (req, res) => {
  const { location } = req.query;
  const filters = location ? { location: { $regex: location, $options: "i" } } : {};
  const complaints = await Complaint.find(filters).sort({ createdAt: -1 });

  res.json({ complaints });
});

export const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id).populate(
    "createdBy",
    "name email role"
  );

  if (!complaint) {
    const error = new Error("Complaint not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({ complaint });
});

export const updateComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    const error = new Error("Complaint not found");
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = [
    "name",
    "email",
    "title",
    "description",
    "category",
    "location",
    "status"
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      complaint[field] = req.body[field];
    }
  });

  const updatedComplaint = await complaint.save();
  res.json({ complaint: updatedComplaint });
});

export const deleteComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    const error = new Error("Complaint not found");
    error.statusCode = 404;
    throw error;
  }

  await complaint.deleteOne();
  res.json({ message: "Complaint deleted successfully" });
});

export const getComplaintStats = asyncHandler(async (_req, res) => {
  const [total, pending, resolved, highPriority] = await Promise.all([
    Complaint.countDocuments(),
    Complaint.countDocuments({ status: "Pending" }),
    Complaint.countDocuments({ status: "Resolved" }),
    Complaint.countDocuments({ "aiAnalysis.priority": "High" })
  ]);

  res.json({ total, pending, resolved, highPriority });
});
