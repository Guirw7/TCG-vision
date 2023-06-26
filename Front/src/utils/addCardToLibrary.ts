import { getIDFromToken } from './getIDFromToken';
import { axiosRequest } from './axiosRequest';

/**
 * 
 * @param {number} collection
 * @param {object} [options={}]
 * @param {number} [options.id]
 * @param {string} [options.setCode]
 */

// export const addCardToLibrary = (libraryID: number, options : {id?: number, setCode?: string}) => {
//   if (options.id) {
//     axiosRequest('put', `https://daoust-jason-server.eddi.cloud/private/deck/${libraryID}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
//       },
//       data: {
//         set_code: options.id,
//       },
//     })
//     .then ((response) => {
//       console.log('réponse : ', response);
//       console.log('data : ', response.data);
//       return response.data;
//      })
//      .catch ((error) => {
//         if (error.response) {
//           console.log(error.response.data);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         } else if (error.request) {
//           console.log(error.request);
//         } else {
//           console.log('Error', error.message);
//         }
//         throw error; 
//     });
//   };
//   if (options.setCode) {
//     axiosRequest('put', `https://daoust-jason-server.eddi.cloud/private/collection/${libraryID}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
//       },
//       data: {
//         set_code: options.setCode,
//       },
//     });
//   };
// };

export const addCardToDeck = (deckID: any, cardID: any) => {
  axiosRequest('put', `https://daoust-jason-server.eddi.cloud/private/deck/${deckID}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    },
    data: {
      set_code: cardID,
    },
  });
};
