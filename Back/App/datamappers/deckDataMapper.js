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
      text: 'INSERT INTO "deck"(card_name, deck_description, creator_username, card_quantity, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      values: [
        deck.card_name,
        deck.deck_description,
        deck.creator_username,
        deck.card_quantity,
        deck.user_id],
    };

    //* On récupère le résultat de la requête préparer
    const results = await client.query(preparedQuery);
    return results.rows[0];
  },
};

module.exports = deckDataMapper;
