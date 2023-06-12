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

    //* On récupère le résultat de la requête préparer
    const results = await client.query(preparedQuery);
    return results.rows[0];
  },

  async modifyUser(user) {
    const preparedQuery = {
      //* modification des informations de l'user concernés.
      text: 'UPDATE "user" SET email=$1 ,username=$2, password=$3 WHERE "id"=$4',
      values: [user.email, user.username, user.password, user.id],
    };
    const results = await client.query(preparedQuery);
    return results.rows; //* retourne le resultat de la requete.

  /**
   * Requête SQL pour  récupérer le détail de tout les users
   */
  async detailUsers() {
    const results = await client.query('SELECT * FROM "user"');
    return results.rows[0];
  },
};

// On exporte le userDataMapper
module.exports = userDataMapper;
