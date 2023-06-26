/* eslint-disable camelcase */
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
      text: 'INSERT INTO "collection"(collection_name, set_code, card_quantity, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [collection.collection_name, collection.set_code, collection.card_quantity, collection.user_id],
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
      text: 'SELECT "user"."username", "collection".* FROM "collection" JOIN "user" ON "collection"."user_id" = "user"."id" WHERE "collection"."id" = $1',
      values: [id],
    };
    // Execute a search request
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },

  /**
   * Requête SQL pour modifier une collection dans la base de données en utilisant une requête préparée.
   */
  async updateCollectionInDB(collection) {
    const preparedQuery = {
      text: 'UPDATE "collection" SET collection_name = $1, set_code = $2, card_quantity = $3 WHERE id = $4 RETURNING *',
      values: [collection.collection_name, collection.set_code, collection.card_quantity, collection.id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  },

  /**
   * Requête SQL pour delete une collection dans la base de données.
   */
  async deleteCollection(id) {
    const preparedQuery = {
      text: 'DELETE FROM "collection" WHERE "id" = $1',
      values: [id],
    };

    const result = await client.query(preparedQuery);
    return result.rows[0];
  },

  /**
   * We join All collection with SELECT for one Id
   */
  async getAllCollectionByUser(user_id) {
    const preparedQuery = {
      text: 'SELECT * FROM "collection" WHERE "user_id" = $1',
      values: [user_id],
    };
    // Execute a search request
    const result = await client.query(preparedQuery);
    return result.rows;
  },
};

// export of dataMapper
module.exports = collectionDataMapper;
