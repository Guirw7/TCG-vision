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

module.exports = deckController;
