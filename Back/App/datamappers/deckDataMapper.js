/* eslint-disable camelcase */
// On recupère le client de connexion
const client = require('../db');

// On construit notre object deckDataMapper
const deckDataMapper = {
/**
   * Requête SQL pour inserer un deck dans la base de données
   * en utilisant une requête préparer
   */
  async addDeckInDB(deck) {
    const preparedQuery = {

      text: 'INSERT INTO "deck"(deck_name, deck_description, card_quantity, set_code, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      values: [
        deck.deck_name,
        deck.deck_description,
        deck.card_quantity,
        deck.set_code,
        deck.user_id],
    };

    //* On récupère le résultat de la requête préparer
    const results = await client.query(preparedQuery);
    return results.rows[0];
  },

  /**
   * Requête SQL pour récuperer tous les decks utilisateurs.
   */
  async getAllDecksByUser(user_id) {
    const preparedQuery = {
      text: 'SELECT * FROM deck WHERE user_id = $1',
      values: [user_id],
    };

    // On récupère le résultat de la requête préparer
    const results = await client.query(preparedQuery);
    return results.rows;
  },

  /**
   * Requête SQL pour récuperer tous les decks utilisateurs.
   * On y join les différentes tables pour récupérer les infos dont on a besoin
   */
  async getAllDecks() {
    const preparedQuery = {
      text: `SELECT "deck"."deck_description", "deck"."card_quantity", "deck"."created_at", "deck"."updated_at",
      "user"."username", 
      "user_like_deck"."counter_like"
      FROM "deck"
      JOIN "user" ON "user"."id" = "deck"."user_id"
      JOIN "user_like_deck" ON "deck"."id" = "user_like_deck"."deck_id"
      `,
    };

    // On récupère le résultat de la requête préparer
    const results = await client.query(preparedQuery);
    return results.rows;
  },

  /**
   * Requête SQL pour supprimer le deck d'un utilisateur.
   * On supprime avant la clé étrangère de la table user_like_deck.
   */
  async deleteOneDeck(id) {
    const deleteLikesQuery = {
      text: 'DELETE FROM "user_like_deck" WHERE "deck_id" = $1',
      values: [id],
    };
    await client.query(deleteLikesQuery);

    const deleteDeckQuery = {
      text: 'DELETE FROM "deck" WHERE id = $1',
      values: [id],
    };
    const result = await client.query(deleteDeckQuery);
    return result.rows;
  },
};

module.exports = deckDataMapper;
