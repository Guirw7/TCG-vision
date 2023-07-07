import React, { useEffect, useState } from 'react';
import { getIDFromToken } from '../../utils/getIDFromToken';
import { axiosRequest } from '../../utils/axiosRequest';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../store";
// import { setUserDeck } from '../DeckEditorPage/userDeckSlice';
import { setSingleDeck } from '../SingleDeck/singleDeckSlice';

import './styles.scss';

interface DeckProps {
  deck: {
    id: number;
    deck_name: string;
    deck_description: string;
    user_id: string;
  };
}

export default function SingleDeck({ deck, deckId, onDeckDelete }: any) {
  const [user, setUser] = useState<any>({});
  const [decks, setDecks] = useState([]);
  const [isOpen, setIsOpen] =useState<boolean>(false)
  const navigate = useNavigate()
  const singleDeck = useSelector((state: RootState) => state.userDeck);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = getIDFromToken();
    const url = `https://daoust-jason-server.eddi.cloud/private/profil/${id}`;
    axiosRequest('get', url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      }
    })
      .then(data => {
        setUser(data);

      })
      .catch(error => {
        console.log('Erreur lors de la requête', error);
      });
  }, []);

  const openConfirmModal = () => {
    setIsOpen(true)
  }

  const closeConfirmModal = () => {
    setIsOpen(false)
  }


  const deleteUserDeck = () => {
    const deckId = deck.id;
    const deckUrl = `https://daoust-jason-server.eddi.cloud/private/deck/${deckId}`;
      axiosRequest('delete', deckUrl, {
        'headers': {
          'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
        }
      }).then(() => {
      console.log('votre deck est supprimé !!!!!!');
      onDeckDelete(deckId)
      }).catch(error => {
      console.log('Erreur lors de la requête', error);
      });
  };

  // Function
  // Mette a jour le redux en lui passant l'id du deck sellectionne (passe de null a 123 etc)
  // Il faut le redirect (navigate)
  // dans la nouvelle page, il faut verifie si il y un id dans le redux
  // si oui, aller chercher les infos
  // si non, nouveau deck
  // lors du submit, si il y avait un id = put, sinon = post


  const deckEditor = () => {
    dispatch(setSingleDeck(deck.id));
    navigate('/deck-creator');
    // console.log('deck.id', deck.id);
  }

  return (
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
                <button className='library-modal-form-button' onClick={deleteUserDeck}>Confirmer</button>
                <button className='library-modal-form-button' onClick={closeConfirmModal}>Annuler</button>
              </div>
            </div>
          </article>
        </div>
        </>
      )
    }
      <div className='single-deck-container'>
        <h1 className='single-deck-title'>{deck.deck_name}</h1>
        <div className='single-deck-image-container'>
          <img src="https://images.ygoprodeck.com/images/cards_cropped/1861629.jpg" alt="" />
        </div>
        <div className='single-deck-description-container'>
          <p className='single-deck-description'>{deck.deck_description}</p>
        </div>
        <div className='single-deck-actions-container'>
            <button className='single-deck-actions-item'>Voir</button>
        {user.id === deck.user_id && (
            <>
            <button onClick={deckEditor} className='single-deck-actions-item'>Éditer</button>
            <button onClick={openConfirmModal} className='single-deck-actions-item'>Supprimer</button>
            </>
        )}
        </div>
      </div>
    </>
  );
}
