// On recupère le client de connexion
const client = require('../db');

// On construit notre object userDataMapper
const userDataMapper = {

  /*
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

  async detailUsers() {
    const results = await client.query('SELECT * FROM "user"');
    return results;
  },
};

// On exporte le userDataMapper
module.exports = userDataMapper;
