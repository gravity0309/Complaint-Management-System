import express from "express";
import {
  createComplaint,
  deleteComplaint,
  getComplaintById,
  getComplaints,
  getComplaintStats,
  searchComplaints,
  updateComplaint
} from "../controllers/complaintController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { validateMongoId } from "../validators/commonValidators.js";
import {
  validateComplaint,
  validateComplaintUpdate
} from "../validators/complaintValidators.js";

const router = express.Router();

router.use(protect);

router.route("/").post(validateComplaint, createComplaint).get(getComplaints);
router.get("/stats", getComplaintStats);
router.get("/search", searchComplaints);
router
  .route("/:id")
  .get(validateMongoId, getComplaintById)
  .put(validateMongoId, validateComplaintUpdate, updateComplaint)
  .delete(validateMongoId, authorize("admin"), deleteComplaint);

export default router;
