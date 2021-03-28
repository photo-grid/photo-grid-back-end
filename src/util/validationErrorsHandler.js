const { validationResult } = require("express-validator");
const logger = require("../config/logger");

// handler for logging and responsing errors when there's a request validation error
module.exports = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    logger.error("Request validation failed");
    return res.status(400).json({
      errors: validationErrors.array(),
    });
  }
  logger.info("Request successfully validated");
  next();
};
