import axios from 'axios';

/**
 * Effectue une requête HTTP à l'aide d'axios et renvoie une promesse.
 * Gère aussi les erreurs de requête HTTP.
 *
 * @param {string} method - La méthode HTTP à utiliser pour la requête (par exemple 'get', 'post', etc.).
 * @param {string} url - L'URL à laquelle la requête doit être envoyée.
 * @param {Object} [headers={}] - Les headers HTTP optionnels à envoyer avec la requête.
 * @returns {Promise<any>} Une promesse qui se résout avec les données de la réponse en cas de succès, ou qui rejette avec une erreur en cas d'échec.
 * @throws {Error} Si une erreur se produit lors de la requête.
 */

export const axiosRequest = (method: string, url: string, headers = {}) => {
  return axios({
    method: `${method}`,
    url: `${url}`,
    headers: headers,
  })
  .then ((response) => {
    return response.data;
   })
   .catch ((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      throw error; 
  });
};
