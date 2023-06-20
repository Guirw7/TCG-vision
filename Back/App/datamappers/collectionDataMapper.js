/* eslint-disable max-len */
// Recover the connection client
const client = require('../db');

/**
   * We build our userDataMapper object
   */
const collectionDataMapper = {
  async addCollectionInDb(collection) {
    const preparedQuery = {
      text: 'INSERT INTO "collection"(collection_name,card_name,card_set,card_quantity,user_id, card_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', //* introduction to the tables required for a collection
      values: [collection.collection_name, collection.card_name, collection.card_set, collection.card_quantity, collection.user_id, collection.card_id],
    };
    // Execute a search request
    const results = await client.query(preparedQuery);
    return results.rows;
  },
};
// export of dataMapper
module.exports = collectionDataMapper;