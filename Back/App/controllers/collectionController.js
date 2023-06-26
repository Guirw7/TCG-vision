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
  async getAllCollectionByUser(req, res) {
    // Récupère l'identifiant de la collection depuis les paramètres de la requête
    const id = parseInt(req.params.userId, 10);

    // Appelle la méthode dans le data mapper
    const recoverAllCollectionByUser = await collectionDataMapper.getAllCollectionByUser(id);

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
    const updatedCollection = await collectionDataMapper.updateCollectionInDB(collection);

    // On renvoie la réponse au format JSON avec le deck modifié
    res.status(200).json(updatedCollection);
  },

  /**
   * Fonction pour delete une collection.
   */
  async deleteCollection(req, res) {
    // On récupère l'id qui est dans le token du user.
    const userId = req.user.data.id;

    const collectionId = parseInt(req.params.collectionId, 10);
    // On récupère le user via son id.
    const user = await userDataMapper.getOneProfil(userId);
    // On récupère une collection via l'id.
    const collection = await collectionDataMapper.getOneCollection(collectionId);

    if (!collection) {
      // Si il n'y a pas de collection on renvoit une réponse avec un status (404).
      res.status(404).json({ message: 'Collection non trouvée !' });
    } else if (user && collection.user_id === userId) {
      // Sinon si on récupère bien l'utilisateur et que l'id dans la table collection
      // est identique à l'id qu'on récupère du token
      await collectionDataMapper.deleteCollection(collectionId);
      // alors on delete la collection avec un status (200).
      res.status(200).json({ message: 'Votre collection a bien été supprimée !' });
    } else {
      // Sinon on lui dit qu'il n'est pas autoriser à supprimer cette collection avec un status (403).
      res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer cette collection !' });
    }
  },
};

module.exports = collectionController;
