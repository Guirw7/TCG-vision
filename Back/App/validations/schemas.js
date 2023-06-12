// On require Joi
const Joi = require('joi');

/**
 * On utilise Joi pour la validation des données envoyer par l'utilisateur
 * validation au niveau de l'email, de l'username et du password
 */
const userBody = Joi.object({
  email: Joi.string()
  /**
   * On utilise une regex pour spécifier des règles de création d'addresse mail
   * Un ou plusieurs caractères en minuscules, chiffres, points,
   *  tirets bas, pourcentages ou signes plus ou moins [a-z0-9._%+-]+
   * Un ou plusieurs caractères en minuscules,
   *  chiffres, points ou tirets [a-z0-9.-]+
   * Deux à quatre caractères en minuscules,
   *  la partie du domaine de premier niveau (TLD) de l'adresse e-mail [a-z]{2,4}
   * Mode insensible à la casse /i
   */
    // eslint-disable-next-line prefer-regex-literals, no-useless-escape
    .email().pattern(new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i')),
  username: Joi.string()
    .alphanum()
    .min(4)
    .max(16),
  password: Joi.string()
  /**
   * On utilise une regex pour spécifier des règles de création de mot de passe
   * Au moins une lettre minuscule (?=.*[a-z])
   * Au moins une lettre majuscule (?=.*[A-Z])
   * Au moins un chiffre (?=.*[0-9])
   * Au moins 8 caractères au minimum et 32 au maximum .{8,32}
   * ^ signifie le début de la regex
   * $ signifie la fin de la regex
   */
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,32}$')),
}).required();

// On exporte l'objet userBody
module.exports = { userBody };
