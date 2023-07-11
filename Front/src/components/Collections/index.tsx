import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import SingleCollection from '../SingleCollection';
import { getIDFromToken } from '../../utils/getIDFromToken';
import { axiosRequest } from '../../utils/axiosRequest';

import { openModal, setCardID } from '../CardModal/modalSlice';
import './styles.scss';


export default function Collection() {
  const [collections, setCollections] = useState<any>([]);
  
  useEffect(() => {
    const id = getIDFromToken();
    const url = `https://daoust-jason-server.eddi.cloud/private/collection/collection/${id}`;
    axiosRequest('get', url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      }
    })
    .then(data => {
      setCollections(data);
      console.log(collections);

    })
    .catch(error => {
      console.log('Erreur lors de la requête', error);
    });
}, []);


  return (
    <div className='deck-container'>
      <div className='deck-container-background'>
        <h1 className='page-title'>Collections</h1>
      
        <div className='decks-body'>

          <div className='decks-actions'>
            <button >Nouvelle collection</button>
          </div >
          <div className='decks-display'>
            {collections.map((collection: any) => (
              <SingleCollection key={collection.id} collection={collection} />
              ))}
          </div>
              
          </div>
       </div>
     </div>
  )
};