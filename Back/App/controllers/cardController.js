const cardDataMapper = require('../datamappers/cardDataMapper');

const cardController = {
  /**
   * Fonction pour ajouter un utilisateur en base de données
   */
  async addDeckInDb(req, res) {
    // On récupère les infos envoyer par l'utilisateur pour la création d'un deck
    const {
      cardName, deckDescription, creatorUsername, userId,
    } = req.body;

    // On créer une variable en utilisant la méthode addUserInDB en lui passant notre objet user
    const newDeck = await cardDataMapper.addDeckInDB(deck);

    // On renvoie la réponse au format JSON avec un status 200 (OK)
    res.status(200).json(newDeck);
  },
};
module.exports = cardController;