import { validationResult } from "express-validator";

/**
 * Middleware used to check if there is a validation error in the request
 * according to the validators using the validationResult function from the
 * express-validator package
 *
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next Next function
 * @returns {void}
 */
export function validateRequestSchema(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    let errors = [];
    for (let i = 0; i < result.array().length; i++) {
      errors.push(result.array()[i].msg);
    }

    return res.status(400).json({ error: errors });
  }
  next();
}
