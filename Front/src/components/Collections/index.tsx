import { useState, useEffect } from 'react';
import SingleCollection from '../SingleCollection';
import { getIDFromToken } from '../../utils/getIDFromToken';
import { axiosRequest } from '../../utils/axiosRequest';

import './styles.scss';


export default function Collection() {
  const [collections, setCollections] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newCollectionName, setNewCollectionName] = useState<any>(null);
  
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
}, [isModalOpen]);

  const openCollectionCreationModal = () => {
    setIsModalOpen(true);
  }
  const closeCollectionCreationModal = () => {
    setIsModalOpen(false);
    console.log(newCollectionName);
  }

  const saveNewCollection = () => {
    const id = getIDFromToken();
    const url = `https://daoust-jason-server.eddi.cloud/private/collection`;
    axiosRequest('post', url, {
      data: {
        collection_name: newCollectionName,
        set_code: [],
        user_id: id
        },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      }
    })
    .then(data => {
      console.log(data);
      setIsModalOpen(false);
    })
    .catch(error => {
      console.log('Erreur lors de la requête', error);
    });
  }

  return (
    <div className='deck-container'>
    {
      isModalOpen && (
        <>
        <div className='behind-form-modal'>
          <article onClick={(e) => e.stopPropagation()} className = "form-modal">
          <button onClick={(e) => {e.stopPropagation(); closeCollectionCreationModal();}} className='form-modal-exit'>X</button>
            <div className='confirm-modal-content'>
              <h1 className='form-modal-message'>Entrez le nom de votre Collection</h1>
              <div className='confirm-modal-actions'>
              <input
                            value={newCollectionName}
                            required
                            onChange={(event) => setNewCollectionName(event.target.value)}
                            className="deck_editor-name-input"
                            placeholder="Nom du Deck"/>
              <button className='library-modal-form-button' onClick={saveNewCollection} >Confirmer</button>
              </div>
            </div>
          </article>
        </div>
        </>
    )}
      <div className='deck-container-background'>
        <h1 className='page-title'>Collections</h1>
      
        <div className='decks-body'>

          <div className='decks-actions'>
            <button onClick={openCollectionCreationModal} >Nouvelle collection</button>
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