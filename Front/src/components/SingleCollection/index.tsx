import { setSingleCollection } from '../SingleCollection/singleCollectionSlice';
import { RootState } from "../../store";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { axiosRequest } from '../../utils/axiosRequest';



export default function SingleCollection({collection, setRefresh}: any) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] =useState<boolean>(false)


  const viewCollection = (event: any) => {
      dispatch(setSingleCollection(collection.id))
      navigate('/collection');
  };

  const openConfirmModal = () => {
    setIsOpen(true)
  }

  const closeConfirmModal = () => {
    setIsOpen(false)
    setRefresh(true)
  }

  const deleteUserCollection = () => {
    const collectionId = collection.id;
    console.log(collectionId);
    const collectionUrl = `https://daoust-jason-server.eddi.cloud/private/collection/${collectionId}`;
      axiosRequest('delete', collectionUrl, {
        'headers': {
          'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
        }
      }).then(() => {
      closeConfirmModal();
      }).catch(error => {
      console.log('Erreur lors de la requête', error);
      });
  };
    
    return(
      <>
      {
        isOpen && (
          <>
          <div className='behind-form-modal'>
            <article onClick={(e) => e.stopPropagation()} className = "form-modal">
            <button onClick={(e) => {e.stopPropagation(); closeConfirmModal();}} className='form-modal-exit'>X</button>
              <div className='confirm-modal-content'>
                <h1 className='form-modal-message'>Etes-vous sûr(e) de vouloir supprimer?</h1>
                <div className='confirm-modal-actions'>
                  <button className='library-modal-form-button' onClick={deleteUserCollection}>Confirmer</button>
                  <button className='library-modal-form-button' onClick={closeConfirmModal}>Annuler</button>
                </div>
              </div>
            </article>
          </div>
          </>
        )
      }
        <div className='single-deck-container'>
        <h1 className='single-deck-title'>{collection.collection_name}</h1>
        <div className='single-deck-image-container'>
          <img src="https://images.ygoprodeck.com/images/cards_cropped/89631139.jpg" alt="" />
        </div>
        <div className='single-deck-description-container'>
        </div>
        <div className='single-deck-actions-container'>
            <button onClick={viewCollection} className='single-deck-actions-item'>Voir</button>
            <button onClick={openConfirmModal} className='single-deck-actions-item'>Supprimer</button>
        </div>
      </div>
      </>

    )
}