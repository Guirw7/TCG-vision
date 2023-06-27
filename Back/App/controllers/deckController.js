/* eslint-disable camelcase */
const deckDataMapper = require('../datamappers/deckDataMapper');
const userDataMapper = require('../datamappers/userDataMapper');

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
      set_code: [set_code],
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

     // recherche et modification d'un deck
     const deck = await deckDataMapper.getOneDeck(deckId);
     if (deck) {
       deck.deck_name = deck_name || deck.deck_name;
       deck.deck_description = deck_description || deck.deck_description;
       deck.card_quantity = card_quantity || deck.card_quantity;
       if (set_code) {
        // Ajouter les nouveaux éléments de set_code à l'ancien tableau
        const combinedSetCode = [...deck.set_code, ...set_code];
    
        // Limiter le nombre maximum de valeurs identiques à 3
        const countedSetCode = combinedSetCode.reduce((acc, value) => {
          acc[value] = (acc[value] || 0) + 1;
          return acc;
        }, {});
    
        deck.set_code = combinedSetCode.filter((value) => countedSetCode[value] <= 3);
      }
     }

    // On appelle la méthode updateDeckInDB du data mapper pour effectuer la modification du deck
    const updatedDeck = await deckDataMapper.updateDeckInDB(deck);

    // On renvoie la réponse au format JSON avec le deck modifié
    res.status(200).json(updatedDeck);
  },

  /**
   * Fonction pour supprimé le deck d'un utilisateur
   */
  async deleteDeck(req, res) {
    // On récupère l'id qui est dans le token du user.
    const userId = req.user.data.id;

    const deckId = parseInt(req.params.deckId, 10);
    // On récupère le user via son id.
    const user = await userDataMapper.getOneProfil(userId);
    // On récupère un deck via l'id.
    const deck = await deckDataMapper.getOneDeck(deckId);

    if (!deck) {
      // Si il n'y a pas de deck on renvoit une réponse avec un status (404).
      res.status(404).json({ message: 'Deck non trouvée !' });
    } else if (user && deck.user_id === userId) {
      // Sinon si on récupère bien l'utilisateur et que l'id dans la table deck
      // est identique à l'id qu'on récupère du token
      await deckDataMapper.deleteOneDeck(deckId);
      // alors on delete le deck avec un status (200).
      res.status(200).json({ message: 'Votre deck a bien été supprimé !' });
    } else {
      // Sinon on lui dit qu'il n'est pas autoriser à supprimer ce deck avec un status (403).
      res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce deck !' });
    }
  },
};

module.exports = deckController;
