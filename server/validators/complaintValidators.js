import { complaintCategories, complaintStatuses } from "../utils/constants.js";
import { isEmail, requireFields } from "./commonValidators.js";

export const validateComplaint = (req, _res, next) => {
  try {
    requireFields(req.body, [
      "name",
      "email",
      "title",
      "description",
      "category",
      "location"
    ]);

    if (!isEmail(req.body.email)) {
      const error = new Error("Please provide a valid email address");
      error.statusCode = 400;
      throw error;
    }

    if (!complaintCategories.includes(req.body.category)) {
      const error = new Error("Invalid complaint category");
      error.statusCode = 400;
      throw error;
    }

    if (req.body.status && !complaintStatuses.includes(req.body.status)) {
      const error = new Error("Invalid complaint status");
      error.statusCode = 400;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateComplaintUpdate = (req, _res, next) => {
  try {
    if (req.body.email && !isEmail(req.body.email)) {
      const error = new Error("Please provide a valid email address");
      error.statusCode = 400;
      throw error;
    }

    if (req.body.category && !complaintCategories.includes(req.body.category)) {
      const error = new Error("Invalid complaint category");
      error.statusCode = 400;
      throw error;
    }

    if (req.body.status && !complaintStatuses.includes(req.body.status)) {
      const error = new Error("Invalid complaint status");
      error.statusCode = 400;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};
