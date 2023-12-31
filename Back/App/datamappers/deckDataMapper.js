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
      text: `SELECT "deck".*,
      "user"."username", 
      "user_like_deck"."counter_like"
      FROM "deck"
      JOIN "user" ON "user"."id" = "deck"."user_id"
      LEFT JOIN "user_like_deck" ON "user_like_deck"."deck_id" = "deck"."id"
      `,
    };

    // On récupère le résultat de la requête préparer
    const results = await client.query(preparedQuery);
    return results.rows;
  },

  /**
   * Requête SQL pour afficher un deck par son id.
   */

  async getOneDeck(deck_id) {
    const preparedQuery = {
      text: 'SELECT deck.*, "user".username FROM deck JOIN "user" ON deck.user_id = "user".id WHERE deck.id = $1',
      values: [deck_id],
    };

    const result = await client.query(preparedQuery);
    return result.rows[0];
  },

  /**
   * Requête SQL pour modifier un deck dans la base de données en utilisant une requête préparée.
   */
  async updateDeckInDB(deck) {
    const preparedQuery = {
      text: 'UPDATE "deck" SET deck_name = $1, deck_description = $2, card_quantity = $3, set_code = $4 WHERE id = $5 RETURNING *',
      values: [deck.deck_name, deck.deck_description, deck.card_quantity, deck.set_code, deck.id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  },

  /**
   * Requête SQL pour supprimer le deck d'un utilisateur.
   */
  async deleteOneDeck(id) {
    const deleteDeckQuery = {
      text: 'DELETE FROM "deck" WHERE id = $1',
      values: [id],
    };
    const result = await client.query(deleteDeckQuery);
    return result.rows[0];
  },

  /**
   * Requête SQL pour compter le nombre de set_code dans un deck.
   * En lui passant l'id du deck en paramètre.
   */
  async countSetCodeInDeck(id) {
    const preparedQuery = {
      text: 'SELECT array_length(set_code, 1) AS set_code_length FROM deck WHERE "id" = $1',
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  },
};

module.exports = deckDataMapper;
