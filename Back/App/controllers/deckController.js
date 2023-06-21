/* eslint-disable camelcase */
const deckDataMapper = require('../datamappers/deckDataMapper');

const deckController = {

  /**
   * Fonction pour récuperer tous les decks utilisateurs.
   */
  async getAllDecks(req, res) {
    const decks = await deckDataMapper.getAllDecks();
    res.status(200).json(decks);
  },
  
  /**
   * Fonction pour ajouter un deck en base de données
   */
  async addDeckInDb(req, res) {
    // On récupère les infos envoyer par l'utilisateur pour la création d'un deck
    const {
      deck_name, deck_description, card_quantity, set_code, user_id,
    } = req.body;

    // On créer un objet avec les infos que l'utilisateur à envoyer
    const deck = {
      deck_name,
      deck_description,
      card_quantity,
      set_code,
      user_id,
    };

    // On créer une variable en utilisant la méthode addDeckInDB en lui passant notre objet user
    const newDeck = await deckDataMapper.addDeckInDB(deck);

    // On renvoie la réponse au format JSON avec un status 200 (OK)
    res.status(200).json(newDeck);
  },

  /**
   * Fonction pour récuperer tous les decks utilisateurs.
   */
  async getAllDecksByUser(req, res) {
    const userId = parseInt(req.params.id, 10);
    const decks = await deckDataMapper.getAllDecksByUser(userId);
    res.status(200).json(decks);
  },
};

module.exports = deckController;
