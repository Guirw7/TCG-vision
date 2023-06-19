// Recover the connection client
const client = require('../db');

// We build our userDataMapper object
const collectionDataMapper = {
  async addCollectionInDb(collection) {
    const preparedQuery = {
      text: 'INSERT INTO "collection"(collection_id, user_id, card_id) VALUES ($1, $2, $3) RETURNING *', //* introduction to the tables required for a collection
      values: [collection.collection_id, collection.user_id, collection.card_id],
    };
    // Execute a search request
    const results = await client.query(preparedQuery);
    return results.rows[0];
  },
  async getAllCollection(collection) {
    const preparedQuery = {
      text: 'SELECT * FROM "collection"', //* allows you to view all collection
      values: [collection.collection],
    };
      // Execute a search request
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async getOneCollection(collection) {
    const preparedQuery = {
        text: 'SELECT * FROM collection WHERE collection_id = $1', //* allows you to view a specific collection
        values: [collection.collection_id]
  };
  // Execute a search request
   const result = await client.query(preparedQuery);
   return result.rows[0];
  
},
    async addCardsInCollection(collection){
        const preparedQuery = {
            text: 'INSERT INTO collection (collection_id, card_id) VALUES ($1, $2)', //* introduces cards to the collection
            values: [collection.colection_id, collection.card_id],
        }
        // Execute a search request
        const result = await client.query(preparedQuery);
        return result.rows[0];
    },

    async deleteOneCollection(collection){
        const preparedQuery = {
            text: 'DELETE FROM collection WHERE collection_id = $1',//* deletes collection
            text: 'DELETE FROM card_id WHERE collection_id = $1', //* deletes cards from the collection
            values: [collection.collection_id, collection.card_id]
        }
        // Execute a search request
        const result = await client.query(preparedQuery);
        return result.rows[0];
    },

    async updateOneCollection(collection){
        const preparedQuery = {
            text: 'UPDATE collection SET name = $1, card_id = $2 WHERE collection_id = $3', //* allows you to modify the name , the collection cards and the collection
            values: [collection.name, collection.card_id, collection.collection_id]
        }
        // Execute a search request
        const result = await client.query(preparedQuery);
        return result.rows[0];
    },

    


// export collectionDataMapper
module.exports = collectionDataMapper,
