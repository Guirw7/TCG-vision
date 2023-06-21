/* eslint-disable max-len */
/* eslint-disable consistent-return */
// middleware/authenticateToken.js

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

/**
 * Middleware pour l'authentification du token.
 * Vérifie si le token d'authentification est inclus dans l'en-tête "Authorization".
 * Si le token est manquant ou non trouvé, renvoie une réponse avec un statut 401 (Unauthorized).
 * Si une erreur se produit lors de la vérification du token, renvoie une réponse avec un statut 403 (Forbidden).
 * Si le token est valide, ajoute l'utilisateur extrait du token à la requête et passe à l'étape suivante.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization dans le header manquant' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token non trouvé dans l\' Authorization du header' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Erreur sur la verification du token' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
