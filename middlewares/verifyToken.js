import jwt from "jsonwebtoken";

/**
 * Middleware used to verify the authentication token sent with the request header
 * and pass the decoded payload in case it's verified successfully, else a 401
 * response is returned with an error message
 *
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next Next function
 * @returns {void}
 */
export function verifyAuthToken(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).json({
      error: "Invalid Token",
    });
  }
}
