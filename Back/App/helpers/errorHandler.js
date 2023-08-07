const logger = require('../log');

/**
 * Middleware de gestion des erreurs.
 * @param {Error} error - L'erreur survenue.
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @param {Function} next - Passe au middleware suivant
 * @returns {Object} - Une réponse JSON avec un message d'erreur personnalisé.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  logger.error(error);
  if (error.code === '23502' && error.table === 'collection' && error.column === 'collection_name') {
    return res.status(400).json({ status: 'error', message: 'The "collection_name" field is required' });
  }
  if (error.code === '23502' && error.table === 'collection' && error.column === 'user_id') {
    return res.status(400).json({ status: 'error', message: 'The "user_id" field is required' });
  }
  if (error.code === '23502' && error.table === 'deck') {
    return res.status(400).json({ status: 'error', message: 'Le champ "deck_name" est obligatoire' });
  }

  if (error.code === '23505' && error.table === 'user' && error.constraint === 'user_username_key') {
    return res.status(400).json({ status: 'error', message: 'Ce pseudo est déjà utilisé' });
  }

  if (error.code === '23505' && error.table === 'user' && error.constraint === 'user_email_key') {
    return res.status(400).json({ status: 'error', message: 'Cet email est déjà utilisé' });
  }

  return res.status(500).json({ status: 'error', message: 'Une erreur interne s\'est produite' });
};

module.exports = errorHandler;
