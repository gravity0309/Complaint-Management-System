import express from "express";
import { getProfile, login, signup } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateLogin, validateSignup } from "../validators/authValidators.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.get("/profile", protect, getProfile);

export default router;
