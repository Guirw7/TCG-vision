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

    //* On récupère le résultat de la requête préparer
    const results = await client.query(preparedQuery);
    return results.rows[0];
  },

  async modifyUser(user) {
    const preparedQuery = {
      //* modification des informations de l'user concernés.
      text: 'UPDATE "user" SET email = $1 ,username = $2, password = $3 WHERE "id" = $4',
      values: [user.email, user.username, user.password, user.id],
    };
    const results = await client.query(preparedQuery);
    return results.rows; //* retourne le resultat de la requete.
  },
  /**
   * Requête SQL pour  récupérer le détail de tout les users
   */
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

  /* Requête SQL pour supprimer le profil d'un user */
  async deleteUser(user) {
    // Mettre à jour les clés étrangères sur NULL dans la table "collection"
    const updateQuery = {
      text: 'DELETE FROM "collection" WHERE "user_id" = $1',
      values: [user.id],
    };
    await client.query(updateQuery);
    // Mettre à jour les clés étrangères sur NULL dans la table "deck"
    const updateQuery2 = {
      text: 'DELETE FROM "deck" WHERE "user_id" = $1',
      values: [user.id],
    };
    await client.query(updateQuery2);
    // Supprimer l'utilisateur de la table "user"
    const deleteQuery = {
      text: 'DELETE FROM "user" WHERE "id" = $1',
      values: [user.id],
    };
    // Exécuter la requête de suppression de l'utilisateur
    const deleteResult = await client.query(deleteQuery);
    return deleteResult.rows[0];
  },

  async getByUsername(username) {
    const preparedQuery = {
      text: 'SELECT username, password FROM "user" WHERE username = $1',
      values: [username],
    };
    // Exécuter la requête de recherche d'un user par son username
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },

  async getByEmail(email) {
    const preparedQuery = {
      text: 'SELECT email FROM "user" WHERE email = $1',
      values: [email],
    };
    // Exécuter la requête de recherche d'un user par son username
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },

  async getDetailsForToken(username) {
    const preparedQuery = {
      text: 'SELECT id, username FROM "user" WHERE username = $1',
      values: [username],
    };

    const results = await client.query(preparedQuery);
    // On ne récupère que le premier résultat du tableau de rows.
    return results.rows[0];
  },
};

// On exporte le userDataMapper
module.exports = userDataMapper;
