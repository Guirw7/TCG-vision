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
          <div className='modal-background'>
            <article onClick={(e) => e.stopPropagation()} className = "modal-body">
            <button onClick={(e) => {e.stopPropagation(); closeConfirmModal();}} className='modal-button-exit'>X</button>
              <div className='modal-actions-container'>
                <h1 className='modal-actions-message'>Etes-vous sûr(e) de vouloir supprimer?</h1>
                <div className='modal-buttons'>
                  <button className='button cancel' onClick={deleteUserCollection}>Confirmer</button>
                  <button className='button' onClick={closeConfirmModal}>Annuler</button>
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
            <button  className='button' onClick={viewCollection} >Voir</button>
            <button  className='button cancel' onClick={openConfirmModal} >Supprimer</button>
        </div>
      </div>
      </>

    )
}