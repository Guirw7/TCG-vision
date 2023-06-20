// On recupère le client de connexion
const client = require('../db');

// On construit notre object userDataMapper
const deckDataMapper = {

  /**
   * Requête SQL pour inserer un deck dans la base de données
   * en utilisant une requête préparer
   */
  async addDeckInDB(deck) {
    const preparedQuery = {
      text: 'INSERT INTO "deck"(card_name, deck_description, creator_username, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [deck.card_name, deck.deck_description, deck.creator_username, deck.user_id],
    };

    //* On récupère le résultat de la requête préparer
    const results = await client.query(preparedQuery);
    return results.rows[0];
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
};

module.exports = deckDataMapper;
