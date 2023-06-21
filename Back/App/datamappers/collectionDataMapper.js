/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
// Recover the connection client
const client = require('../db');

const collectionDataMapper = {
  /**
   * We create one collection in collection table 
   */
  async addCollectionInDb(collection) {
    const preparedQuery = {
      // introduction to the tables required for a collection
      text: 'INSERT INTO "collection"(collection_name,card_name,card_set,card_quantity,user_id, card_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [collection.collection_name, collection.card_name, collection.card_set, collection.card_quantity, collection.user_id, collection.card_id],
    };
    // Execute a search request
    const results = await client.query(preparedQuery);
    return results.rows;
  },
  /**
   * We join one collection with SELECT
   */
  async getOneCollection(id) {
    const preparedQuery = {
      // allows you to view a specific collection
      text: 'SELECT * FROM collection WHERE "id" = $1',
      values: [id],
    };
    // Execute a search request
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
};
// export of dataMapper
module.exports = collectionDataMapper;
