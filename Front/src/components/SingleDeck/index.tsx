import React, { useEffect, useState } from 'react';
import { getIDFromToken } from '../../utils/getIDFromToken';
import { axiosRequest } from '../../utils/axiosRequest';

import './styles.scss';

interface DeckProps {
  deck: {
    deck_name: string;
    deck_description: string;
    user_id: string;
  };
}

export default function SingleDeck({ deck }: DeckProps) {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const id = getIDFromToken();
    const url = `https://daoust-jason-server.eddi.cloud/private/profil/${id}`;
    axiosRequest('get', url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      }
    })
      .then(data => {
        console.log(data);
        setUser(data);
      })
      .catch(error => {
        console.log('Erreur lors de la requête', error);
      });
  }, []);

  return (
    <>
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
            <button className='single-deck-actions-item'>Éditer</button>
            <button className='single-deck-actions-item'>Supprimer</button>
            </>
        )}
        </div>
      </div>
    </>
  );
}
