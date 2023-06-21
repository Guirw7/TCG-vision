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
  async getAllDecksByUser(userId) {
    const preparedQuery = {
      text: 'SELECT deck.*, "user".username FROM deck JOIN "user" ON deck.user_id = "user".id WHERE deck.user_id = $1',
      values: [userId],
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
      "card"."id", "card"."set_code", 
      "deck_has_card"."counter_like"
      FROM "deck"
      JOIN "user" ON "user"."id" = "deck"."user_id"
      JOIN "deck_has_card" ON "deck"."id" = "deck_has_card"."deck_id"
      JOIN "card" ON "card"."id" = "deck_has_card"."card_id"
      `,
    };

    // On récupère le résultat de la requête préparer
    const results = await client.query(preparedQuery);
    return results.rows;
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
};

module.exports = deckDataMapper;
