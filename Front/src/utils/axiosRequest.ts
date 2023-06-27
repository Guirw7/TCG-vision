import axios from 'axios';

/**
 * Effectue une requête HTTP à l'aide d'axios et renvoie une promesse.
 * Gère aussi les erreurs de requête HTTP.
 *
 * @param {string} method - La méthode HTTP à utiliser pour la requête (par exemple 'get', 'post', etc.).
 * @param {string} url - L'URL à laquelle la requête doit être envoyée.
 * @param {Object} [options={}] - Un objet optionnel qui peut contenir `data` et/ou `headers` à envoyer avec la requête.
 * @param {Object} [options.data] - Les données optionnelles à envoyer avec la requête.
 * @param {Object} [options.headers] - Les headers HTTP optionnels à envoyer avec la requête.
 * @returns {Promise<any>} Une promesse qui se résout avec les données de la réponse en cas de succès, ou qui rejette avec une erreur en cas d'échec.
 * @throws {Error} Si une erreur se produit lors de la requête.
 */

export const axiosRequest = (method: string, url: string, options: { data?: object, headers?: object } = {}): Promise<any> => {
  return axios({
    method: method,
    url: url,
    data: options.data,
    headers: options.headers,
  })
  .then ((response) => {
    console.log('réponse : ', response);
    // console.log('data : ', response.data);
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
