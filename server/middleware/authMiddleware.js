import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    const error = new Error("Access denied. No token provided.");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    next();
  } catch (error) {
    error.statusCode = 401;
    error.message = "Access denied. Invalid token.";
    throw error;
  }
});

export const authorize = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user?.role)) {
    const error = new Error("You are not authorized to perform this action");
    error.statusCode = 403;
    next(error);
    return;
  }

  next();
};
