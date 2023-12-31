/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable camelcase */
const collectionDataMapper = require('../datamappers/collectionDataMapper');
const userDataMapper = require('../datamappers/userDataMapper');

const collectionController = {
  /**
   * A variable is created using the addCollectionInDb method.
   */
  async addCollectionInDb(req, res) {
    const { collection_name, set_code, user_id } = req.body;
    const createCollection = {
    // Retrieves the entire collection table.
      collection_name,
      set_code,
      user_id,
    };
    const newCollection = await collectionDataMapper.addCollectionInDb(
      createCollection,
    );

    if (!newCollection) {
      res.status(400).json({ message: 'Collection creation failed!' });
    }
    // The response is returned in JSON format with a 200 status.(OK)
    res.status(200).json(newCollection);
  },

  /**
   * On créer une variable en utilisant la méthode addOneCollection
   */
  async getOneCollection(req, res) {
    const id = parseInt(req.params.id, 10); // Récupère l'identifiant de la collection depuis les paramètres de la requête

    // Appelle la méthode dans le data mapper
    const recoverCollection = await collectionDataMapper.getOneCollection(id);

    if (!recoverCollection) {
      // Si la collection n'est pas trouvée, renvoie une réponse avec le statut 404 (Not Found)
      res.status(404).json({ message: "La collection n'existe pas !" });
    } else {
      // Renvoie la collection récupérée en tant que réponse JSON avec le statut 200 (OK)
      res.status(200).json(recoverCollection);
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

    if (!recoverAllCollectionByUser) {
      // Si la(les) collection(s) n'est pas trouvée(s), renvoie une réponse avec le statut 404 (Not Found)
      res.status(404).json({ message: "Vous n'avez aucune collection !" });
    } else {
      // Renvoie la(les) collection(s) récupérée(s) en tant que réponse JSON avec le statut 200 (OK)
      res.status(200).json(recoverAllCollectionByUser);
    }
  },

  /**
   * Function to modify a collection in the database.
   */
  async updateCollectionInDB(req, res) {
    const collectionId = parseInt(req.params.id, 10);

    // Retrieve the information sent by the user for the modification of the collection
    const { collection_name, set_code } = req.body;

    // Call the getOneCollection method of the data mapper to retrieve the existing collection
    const collection = await collectionDataMapper.getOneCollection(collectionId);

    if (collection) {
      // Update the properties of the collection
      collection.collection_name = collection_name || collection.collection_name;

      if (set_code) {
        // Add the new set_code elements to the old array
        collection.set_code = [...collection.set_code, ...set_code];
      }

      // Call the updateCollectionInDB method of the data mapper to perform the modification of the collection
      const updatedCollection = await collectionDataMapper.updateCollectionInDB(collection);

      // Return the response in JSON format with the modified collection
      res.status(200).json(updatedCollection);
    } else {
      // If the collection does not exist, return an appropriate error response
      res.status(404).json({ message: 'The specified collection does not exist.' });
    }
  },

  /**
   * Fonction pour retirer une carte d'une collection dans la base de données.
   */
  async deleteSetCodeToCollection(req, res) {
    const collectionId = parseInt(req.params.id, 10);

    // On récupère les informations envoyées par l'utilisateur pour la modification de la collection
    const { set_code } = req.body;

    // On appelle la méthode getOneCollection du data mapper pour récupérer la collection existante
    const collection = await collectionDataMapper.getOneCollection(collectionId);

    if (collection) {
      // On met à jour les propriétés de la collection
      collection.set_code = set_code || collection.set_code;

      // On appelle la méthode deleteSetCodeToCollection du data mapper pour effectuer la modification de la collection
      const updatedCollection = await collectionDataMapper.deleteSetCodeToCollection(collection);

      // On renvoie la réponse au format JSON avec la collection modifiée
      res.status(200).json(updatedCollection);
    } else {
      // Si la collection n'existe pas, renvoyer une réponse d'erreur appropriée
      res.status(404).json({ message: "La collection spécifiée n'existe pas." });
    }
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
    const collection = await collectionDataMapper.getOneCollection(
      collectionId,
    );

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
      res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cette collection !" });
    }
  },
};

module.exports = collectionController;
