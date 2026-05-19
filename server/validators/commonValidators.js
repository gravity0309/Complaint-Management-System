import mongoose from "mongoose";

export const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateMongoId = (req, _res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = new Error("Invalid resource ID");
    error.statusCode = 400;
    next(error);
    return;
  }

  next();
};

export const requireFields = (body, fields) => {
  const missing = fields.filter((field) => {
    const value = body[field];
    return value === undefined || value === null || String(value).trim() === "";
  });

  if (missing.length > 0) {
    const error = new Error(`Missing required field(s): ${missing.join(", ")}`);
    error.statusCode = 400;
    throw error;
  }
};
