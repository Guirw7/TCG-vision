/* eslint-disable camelcase */
const deckDataMapper = require('../datamappers/deckDataMapper');
const userDataMapper = require('../datamappers/userDataMapper');

const deckController = {

  /**
   * Fonction pour récuperer tous les decks utilisateurs.
   */
  async getAllDecks(req, res) {
    const decks = await deckDataMapper.getAllDecks();
    if (!decks) {
      res.status(404).json({ message: 'Il n\'y a aucun decks !' });
    }
    res.status(200).json(decks);
  },

  /**
   * Fonction pour ajouter un deck en base de données
   */
  async addDeckInDb(req, res) {
    // On récupère les infos envoyées par l'utilisateur pour la création d'un deck
    const {
      deck_name, deck_description, set_code, user_id,
    } = req.body;

    // On crée un objet avec les infos que l'utilisateur a envoyées
    const deck = {
      deck_name,
      deck_description,
      set_code: [],
      user_id,
    };

    // Ajouter les nouvelles cartes du set_code à l'objet deck
    if (set_code && Array.isArray(set_code)) {
      // Compter les occurrences des cartes
      const cardCounts = {};
      const filteredSetCode = [];

      set_code.forEach((card) => {
        if (!cardCounts[card] || cardCounts[card] < 3) {
          filteredSetCode.push(card);
          cardCounts[card] = cardCounts[card] ? cardCounts[card] + 1 : 1;
        }
      });

      if (filteredSetCode.length <= 75) {
        deck.set_code = filteredSetCode;
      } else {
        return res.status(400).json({ message: 'Vous ne pouvez pas ajouter plus de 75 cartes à votre deck !' });
      }

      if (set_code.length !== filteredSetCode.length) {
        return res.status(409).json({ message: 'Vous ne pouvez pas avoir plus de 3 exemplaires de la même carte dans votre deck !' });
      }
    }

    // On utilise la méthode addDeckInDB du data mapper pour effectuer la création du deck
    const newDeck = await deckDataMapper.addDeckInDB(deck);

    if (!newDeck) {
      return res.status(400).json({ message: 'La création du deck a échoué !' });
    }

    // On renvoie la réponse au format JSON avec un statut 201 (Created)
    return res.status(201).json(newDeck);
  },

  /**
   * Fonction pour récuperer tous les decks utilisateurs.
   */
  async getAllDecksByUser(req, res) {
    const userId = parseInt(req.params.id, 10);
    const decks = await deckDataMapper.getAllDecksByUser(userId);

    if (!decks) {
      res.status(404).json({ message: 'Cet utilisateur n\'a pas créer de deck !' });
    }

    res.status(200).json(decks);
  },

  async getOneDeck(req, res) {
    const deckId = parseInt(req.params.id, 10);
    const deck = await deckDataMapper.getOneDeck(deckId);

    if (!deck) {
      res.status(404).json({ message: 'Deck non trouvé !' });
    }
    return res.status(200).json(deck);
  },

  /**
   * Fonction pour modifier un deck dans la base de données.
   */
  async updateDeckInDb(req, res) {
    const deckId = parseInt(req.params.id, 10);

    // Récupérer les informations envoyées par l'utilisateur pour la modification du deck
    const {
      deck_name, deck_description, set_code,
    } = req.body;

    // Recherche et modification d'un deck
    const deck = await deckDataMapper.getOneDeck(deckId);
    if (deck) {
      deck.deck_name = deck_name || deck.deck_name;
      deck.deck_description = deck_description || deck.deck_description;
      deck.set_code = set_code || deck.set_code;
    } else {
      return res.status(404).json({ message: 'Deck non trouvé !' });
    }

    const total = await deckDataMapper.countSetCodeInDeck(deckId);
    const setCodeLength = total[0].set_code_length;

    if (setCodeLength < 75) {
      // Appeler la méthode updateDeckInDB du data mapper pour effectuer la modification du deck
      const updatedDeck = await deckDataMapper.updateDeckInDB(deck);
      if (!updatedDeck) {
        return res.status(409).json({ message: 'La modification du deck à échoué !' });
      }
      return res.status(200).json(updatedDeck);
    }
    return res.status(400).json({ message: 'Vous ne pouvez pas rajouter de cartes, la limite de 75 cartes est atteinte.' });
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
