import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateToken } from "../services/tokenService.js";

const userPayload = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role
});

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("User already exists with this email");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    user: userPayload(user),
    token: generateToken(user._id)
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  res.json({
    user: userPayload(user),
    token: generateToken(user._id)
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  res.json({ user: userPayload(req.user) });
});
