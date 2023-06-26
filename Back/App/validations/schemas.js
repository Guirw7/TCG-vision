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
   */
    // eslint-disable-next-line prefer-regex-literals, no-useless-escape
    .pattern(new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'))
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr'] } })
    .messages({
      'string.pattern.base': 'Veuillez rentrez un email valide',
      'string.email': 'L\'email doit se finir par un .com ou .fr',
    }),
  username: Joi.string()
    .alphanum()
    .min(4)
    .max(16)
    .messages({
      'string.min': 'Username doit avoir 4 caractère minimum et 16 maximum',
    }),
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
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,32}$'))
    .messages({
      'string.pattern.base': 'Password doit contenir au moins 1 lettres minuscule et majuscule, 1 chiffre et doit faire au minimum 8 caractères et au maximum 32.',
    }),
}).required();

// On exporte l'objet userBody
module.exports = { userBody };
