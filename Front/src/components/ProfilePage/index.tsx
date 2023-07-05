import './styles.scss';
import SingleDeck from '../SingleDeck';
import { getIDFromToken } from '../../utils/getIDFromToken';
import { axiosRequest } from '../../utils/axiosRequest';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [decks, setDecks] = useState([]);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const id = getIDFromToken();
    const url = `https://daoust-jason-server.eddi.cloud/private/profil/${id}`;
    axiosRequest('get', url, {
      'headers': {
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
      },
    })
    .then(data => {
      console.log(data);
      setUser(data);
    })
    .catch(error => {
      console.log('Erreur lors de la requête', error);
    });



  }, []); 

  const getUserDecks = () => {
      const id = getIDFromToken();
      const url = `https://daoust-jason-server.eddi.cloud/private/deck/${id}`;
      axiosRequest('get', url, {
        'headers': {
          'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
        },
      })
      .then(data => {
        setDecks(data);
      })
      .catch(error => {
        console.log('Erreur lors de la requête', error);
      });
  };







  return (
    <div className='profil-container'>
      <div className='profil-container-background'>
        <h1 className='profil-title'>Votre Profil</h1>
        <div className='user-banner-container'>
          <img className='profil-picture' src="https://www.shareicon.net/data/2016/07/05/791224_man_512x512.png" alt="" />
          <h2 className='profil-username'>{user.username}</h2>
        </div>
        <div className='profil-body-container'>

        <div className='profil-nav'>
          <button onClick={getUserDecks} className="profil-nav-button" >Decks</button>
          <button className="profil-nav-button" >Favoris</button>
          <button className="profil-nav-button" >Paramétre</button>
        </div>
        <div className='user-content'>
          {decks.map((deck: any) => {
            return (
              <SingleDeck key={deck.id} deck={deck}/>
            )
          })}
        </div>
        </div>
      </div>
    </div>
  );
}