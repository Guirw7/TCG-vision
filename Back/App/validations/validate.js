/**
 * Fonction qui renvoie la validation du schema Joi concernant l'inscripton
 * Si il y a une erreur on récupère et on affiche toutes les erreurs à afficher.
 * @param {Object} schema - validation de Joi
 * @returns {function} - un middleware
 */

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ status: 'error', errors });
    }

    return next();
  };
}

module.exports = validate;
