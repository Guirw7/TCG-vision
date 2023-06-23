/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable camelcase */
const collectionDataMapper = require('../datamappers/collectionDataMapper');
const userDataMapper = require('../datamappers/userDataMapper');

const collectionController = {

  /**
   * On créer une variable en utilisant la méthode addCollectionInD
   */
  async addCollectionInDb(req, res) {
    const {
      collection_name, set_code, card_quantity, user_id,
    } = req.body;
    const createCollection = {
      // on recupere toute la table collection.
      collection_name,
      set_code: [set_code],
      card_quantity,
      user_id,
    };
    const newCollection = await collectionDataMapper.addCollectionInDb(createCollection);
    // on renvoie la reponse en format JSON avec un status 200.(OK)
    res.status(200).json(newCollection);
  },

  /**
   * On créer une variable en utilisant la méthode addOneCollection
   */
  async getOneCollection(req, res) {
    const id = parseInt(req.params.id, 10); // Récupère l'identifiant de la collection depuis les paramètres de la requête

    // Appelle la méthode dans le data mapper
    const recoverCollection = await collectionDataMapper.getOneCollection(id);

    if (recoverCollection) {
      // Renvoie la collection récupérée en tant que réponse JSON avec le statut 200 (OK)
      res.status(200).json(recoverCollection);
    } else {
      // Si la collection n'est pas trouvée, renvoie une réponse avec le statut 404 (Not Found)
      res.status(404).json({ message: 'Collection not found' });
    }
  },

  /**
   * On créer une variable en utilisant la méthode addOneCollection
   */
  async getAllCollectionByUser(user_id) {
    // Récupère l'identifiant de la collection depuis les paramètres de la requête
    const id = parseInt(req.params.id, 10);

    // Appelle la méthode dans le data mapper
    const recoverAllCollectionByUser = await collectionDataMapper.getAllCollectionByUser(user_id);

    if (recoverAllCollectionByUser) {
      // Renvoie la(les) collection(s) récupérée(s) en tant que réponse JSON avec le statut 200 (OK)
      res.status(200).json(recoverAllCollectionByUser);
    } else {
      // Si la(les) collection(s) n'est pas trouvée(s), renvoie une réponse avec le statut 404 (Not Found)
      res.status(404).json({ message: 'Collection not found' });
    }
  },

  /**
   * Fonction pour modifier une collection dans la base de données.
   */
  async updateCollectionInDB(req, res) {
    const collectionId = parseInt(req.params.id, 10);

    // On récupère les informations envoyées par l'utilisateur pour la modification de la collection
    const {
      collection_name, set_code, card_quantity,
    } = req.body;

    // On crée un objet avec les informations que l'utilisateur a envoyées
    const collection = {
      id: collectionId,
      collection_name,
      set_code: [set_code],
      card_quantity,
    };

    // On appelle la méthode updateCollectionInDB du data mapper pour effectuer la modification de la collection
    const updatedDeck = await deckDataMapper.updateCollectionInDB(collection);

    // On renvoie la réponse au format JSON avec le deck modifié
    res.status(200).json(updatedDeck);
  },

  /**
   * Fonction pour delete une collection.
   * On récupère d'abord le user via son id.
   */
  async deleteCollection(req, res) {
    const userId = req.user.data.id;
    const collectionId = parseInt(req.params.collectionId, 10);

    const user = await userDataMapper.getOneProfil(userId);
    if (user) {
      await collectionDataMapper.deleteCollection(collectionId);
      res.status(200).json({ message: 'delete' });
    }
  },
};

module.exports = collectionController;
