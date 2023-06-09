// On require Joi
const Joi = require('joi');

/**
 * On utilise Joi pour la validation des données envoyer par l'utilisateur
 * validation au niveau de l'email, de l'username et du password
 */
const userBody = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr'] } }),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  password: Joi.string()
  /**
   * On utilise une regex pour spécifier des règles de création de mot de passe
   * Au moins une lettre minuscule (?=.*[a-z])
   * Au moins une lettre majuscule (?=.*[A-Z])
   * Au moins un chiffre (?=.*[0-9])
   * Au moins 8 caractères .{8,}
   * ^ signifie le début de la regex
   * $ signifie la fin de la regex
   */
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$')),
}).required();

// On exporte l'objet userBody
module.exports = { userBody };
