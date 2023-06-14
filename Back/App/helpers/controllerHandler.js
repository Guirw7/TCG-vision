const logger = require('../log');

/**
 * Fonction qui retourne un controlleur avec une gestion d'erreur
 *
 * @param {function} controllerAction - un middleware controlleur
 * @returns {function} un middleware controlleur avec gestion d'erreur
 */
const controllerHandler = (controllerAction) => async (req, res, next) => {
  try {
    logger.log('exécution du controller ');
    await controllerAction(req, res, next);
  } catch (error) {
    logger.log('erreur attrapée par le controllerHandler');
    next(error);
  }
};

module.exports = controllerHandler;
