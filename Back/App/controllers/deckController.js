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

  async getOneDeck(req, res) {
    const deckId = parseInt(req.params.id, 10);
    const deck = await deckDataMapper.getOneDeck(deckId);
    return res.status(200).json(deck);
  },

  /**
   * Fonction pour modifier un deck dans la base de données.
   */
  async updateDeckInDb(req, res) {
    const deckId = parseInt(req.params.id, 10);

    // On récupère les informations envoyées par l'utilisateur pour la modification du deck
    const {
      deck_name, deck_description, card_quantity, set_code,
    } = req.body;

    // On crée un objet avec les informations que l'utilisateur a envoyées
    const deck = {
      id: deckId,
      deck_name,
      deck_description,
      card_quantity,
      set_code,
    };

    // On appelle la méthode updateDeckInDB du data mapper pour effectuer la modification du deck
    const updatedDeck = await deckDataMapper.updateDeckInDB(deck);

    // On renvoie la réponse au format JSON avec le deck modifié
    res.status(200).json(updatedDeck);
  },
};

module.exports = deckController;
