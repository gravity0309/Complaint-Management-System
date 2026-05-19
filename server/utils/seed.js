import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

dotenv.config();

const seed = async () => {
  await connectDB();
  await Promise.all([User.deleteMany(), Complaint.deleteMany()]);

  const [admin, user] = await User.create([
    {
      name: "Admin User",
      email: "admin@example.com",
      password: "Admin123",
      role: "admin"
    },
    {
      name: "Citizen User",
      email: "user@example.com",
      password: "User123",
      role: "user"
    }
  ]);

  await Complaint.create([
    {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      title: "Water leakage near main road",
      description:
        "A water pipeline has been leaking for two days near the society gate and the road is becoming slippery.",
      category: "Water Supply",
      location: "Ghaziabad",
      status: "Pending",
      createdBy: user._id,
      aiAnalysis: {
        priority: "Medium",
        department: "Water Department",
        summary: "Pipeline leakage near society gate is causing slippery road conditions.",
        autoResponse:
          "Your complaint has been registered and forwarded to the Water Department."
      }
    },
    {
      name: "Priya Singh",
      email: "priya@example.com",
      title: "Electric pole sparking",
      description:
        "The electric pole outside block C is sparking during evening hours and could be dangerous for residents.",
      category: "Electricity",
      location: "Noida",
      status: "In Progress",
      createdBy: admin._id,
      aiAnalysis: {
        priority: "High",
        department: "Electrical Department",
        summary: "Electric pole sparking outside block C is a safety risk.",
        autoResponse:
          "Your urgent complaint has been forwarded to the Electrical Department."
      }
    },
    {
      name: "Amit Verma",
      email: "amit@example.com",
      title: "Garbage not collected",
      description:
        "Garbage has not been collected from our lane for four days, causing smell and hygiene issues.",
      category: "Garbage",
      location: "Delhi",
      status: "Resolved",
      createdBy: user._id,
      aiAnalysis: {
        priority: "Medium",
        department: "Sanitation Department",
        summary: "Garbage collection delay is causing hygiene concerns.",
        autoResponse:
          "Your complaint has been registered and forwarded to the Sanitation Department."
      }
    }
  ]);

  console.log("Seed data created");
  console.log("Admin: admin@example.com / Admin123");
  console.log("User: user@example.com / User123");
  await mongoose.connection.close();
};

seed().catch(async (error) => {
  console.error(error);
  await mongoose.connection.close();
  process.exit(1);
});
