/* eslint-disable camelcase */
const collectionDataMapper = require('../datamappers/collectionDataMapper');

const collectionController = {
  /**
   * On créer une variable en utilisant la méthode addCollectionInD
   */
  async addCollectionInDb(req, res) {
    const {
      collection_name, card_name, card_set, card_quantity, user_id, card_id, 
    } = req.body;
    const createCollection = {
      // on recupere toute la table collection.
      collection_name,
      card_name,
      card_set,
      card_quantity,
      user_id,
      card_id,
    };
    const newCollection = await collectionDataMapper.addCollectionInDb(createCollection);
    // on renvoie la reponse en format JSON avec un status 200.(OK)
    res.status(200).json(newCollection);
  },

  async getOneCollection(req, res) {
    const {
      collection_name, card_name, card_set, card_quantity, user_id, card_id, 
    } = req.body;
    const addOneCollection = {
      // on recupere toute la table collection.
      collection_name,
      card_name,
      card_set,
      card_quantity,
      user_id,
      card_id,
    };
    const recoverCollection = await collectionDataMapper.getOnCollection(addOneCollection);
    // on renvoie la reponse en format JSON avec un status 200.(OK)
    res.status(200).json(recoverCollection);
  },
};

module.exports = collectionController;
