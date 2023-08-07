/* eslint-disable max-len */
/* eslint-disable consistent-return */

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const revokedTokens = require('./revokedToken');

/**
 * Middleware for token authentication.
 * @param {Object} req - The HTTP request object, expected to have an 'authorization' header.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - Move to the next middleware.
 * @returns {Object} - A JSON response with either a successful message (on validation) or an error message.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization missing in the header' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not found in the header\'s Authorization' });
  }

  if (revokedTokens.includes(token)) {
    return res.status(401).json({ message: 'Revoked JWT. Please log in again.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Error in token verification' });
    }

    req.user = user;
    next();
  });
}

/**
 * Function to reset the tokens stored in the revokedTokens array.
 * @returns {void} - This function doesn't return anything.
 */
function removeRevokedTokens() {
  // Remove all revoked tokens from the array
  revokedTokens.length = 0;
}

module.exports = {
  authenticateToken,
  removeRevokedTokens,
};
