import mongoose from "mongoose";
import { complaintCategories, complaintStatuses } from "../utils/constants.js";

const aiAnalysisSchema = new mongoose.Schema(
  {
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },
    department: {
      type: String,
      default: "General Administration"
    },
    summary: {
      type: String,
      default: ""
    },
    autoResponse: {
      type: String,
      default:
        "Your complaint has been registered successfully and forwarded to the concerned department."
    }
  },
  { _id: false }
);

const complaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true
  },
  title: {
    type: String,
    required: [true, "Complaint title is required"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Complaint description is required"],
    trim: true
  },
  category: {
    type: String,
    enum: complaintCategories,
    required: [true, "Complaint category is required"]
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true
  },
  status: {
    type: String,
    enum: complaintStatuses,
    default: "Pending"
  },
  aiAnalysis: {
    type: aiAnalysisSchema,
    default: () => ({})
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

complaintSchema.index({ location: "text", title: "text", description: "text" });

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
