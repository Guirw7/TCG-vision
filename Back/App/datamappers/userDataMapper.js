// On recupère le client de connexion
const client = require('../db');

// On construit notre object userDataMapper
const userDataMapper = {

  /**
   * Requête SQL pour inserer un user dans la base de données lors de l'inscription au formulaire
   * en utilisant une requête préparer
   */
  async addUserInDB(user) {
    const preparedQuery = {
      text: 'INSERT INTO "user"(email, username, password) VALUES ($1, $2, $3) RETURNING *',
      values: [user.email, user.username, user.password],
    };

    // On récupère le résultat de la requête préparer
    const results = await client.query(preparedQuery);
    return results.rows[0];
  },

  /* Requête SQL pour  récupérer le détail de tout les users */
  async detailUsers() {
    const results = await client.query('SELECT * FROM "user"');
    return results.rows;
  },

  /**
   * Requête SQL pour récuperer le profil d'un utilisateur
   * Attend un id en argument.
   */
  async getOneProfil(id) {
    const preparedQuery = {
      text: 'SELECT * FROM "user" WHERE "id" = $1',
      values: [id],
    };

    const results = await client.query(preparedQuery);
    // On ne récupère que le premier résultat du tableau de rows.
    return results.rows[0];
  },
};

// On exporte le userDataMapper
module.exports = userDataMapper;
