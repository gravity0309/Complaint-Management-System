import { isEmail, requireFields } from "./commonValidators.js";

export const validateSignup = (req, _res, next) => {
  try {
    requireFields(req.body, ["name", "email", "password"]);

    if (!isEmail(req.body.email)) {
      const error = new Error("Please provide a valid email address");
      error.statusCode = 400;
      throw error;
    }

    if (String(req.body.password).length < 6) {
      const error = new Error("Password must be at least 6 characters");
      error.statusCode = 400;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateLogin = (req, _res, next) => {
  try {
    requireFields(req.body, ["email", "password"]);

    if (!isEmail(req.body.email)) {
      const error = new Error("Please provide a valid email address");
      error.statusCode = 400;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};
