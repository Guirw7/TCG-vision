const deckDataMapper = require('../datamappers/deckDataMapper');

const deckController = {

  /**
   * Fonction pour récuperer tous les decks utilisateurs.
   */
  async getAllDecks(req, res) {
    const decks = await deckDataMapper.getAllDecks();
    res.status(200).json(decks);
  },
};

/* eslint-disable camelcase */
const deckDataMapper = require('../datamappers/deckDataMapper');

const deckController = {
  /**
   * Fonction pour ajouter un utilisateur en base de données
   */
  async addDeckInDb(req, res) {
    // On récupère les infos envoyer par l'utilisateur pour la création d'un deck
    const {
      card_name, deck_description, creator_username, card_quantity, user_id,
    } = req.body;

    // On créer un objet avec les infos que l'utilisateur à envoyer
    const deck = {
      card_name,
      deck_description,
      creator_username,
      user_id,
      card_quantity,
    };

    // On créer une variable en utilisant la méthode addDeckInDB en lui passant notre objet user
    const newDeck = await deckDataMapper.addDeckInDB(deck);

    // On renvoie la réponse au format JSON avec un status 200 (OK)
    res.status(200).json(newDeck);
  },
};

module.exports = deckController;
