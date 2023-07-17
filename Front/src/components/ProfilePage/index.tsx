// import './styles.scss';
import SingleDeck from '../SingleDeck';
import { getIDFromToken } from '../../utils/getIDFromToken';
import { axiosRequest } from '../../utils/axiosRequest';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserParams from '../userParams';
import { set } from 'react-hook-form';

export default function ProfilePage() {
  const [decks, setDecks] = useState([]);
  const [user, setUser] = useState<any>({});
  const [isParamsOpen, setIsParamsOpen] = useState<boolean>(false);
  const [isDeckOpen, setIsDeckOpen] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false)
  const navigate = useNavigate();

  useEffect(() => {
    setRefresh(false)
    const id = getIDFromToken();
    const url = `https://daoust-jason-server.eddi.cloud/private/profil/${id}`;
    axiosRequest('get', url, {
      'headers': {
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
      },
    })
    .then(data => {
      // console.log(data);
      setUser(data);
    })
    .catch(error => {
      console.log('Erreur lors de la requête', error);
    });



  }, [isParamsOpen, refresh]); 

  const getUserDecks = () => {
      setDecks([]);
      setIsDeckOpen(true);
      setIsParamsOpen(false);
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

  const handleDeckDelete = (deletedDeckId : any ) => {
    // setRefresh(true);
    console.log(deletedDeckId)
    getUserDecks()
  };

  const handleParamsOpen = () => {
    setIsParamsOpen(true);
    setIsDeckOpen(false);
  }





  return (
    <div className='profil-container'>
      <div className='profil-container-background'>
        <h1 className='profil-title'>Votre Profil</h1>
        <div className='user-banner-container'>
          <img className='profil-picture' src="https://avatarfiles.alphacoders.com/310/thumb-310698.png" alt="" />
          <h2 className='profil-username'>{user.username}</h2>
        </div>
        <div className='profil-body-container'>

        <div className='profil-nav'>
          <button className='button' onClick={() => navigate('/deck-creator')} >Créer un Deck</button>
          <button className='button' onClick={getUserDecks} >Mes Decks</button>
          <button className='button' >Mes Favoris</button>
          <button className='button' onClick={handleParamsOpen} >Paramétres</button>
        </div>
        <div className='user-content'>
            {isDeckOpen && decks.map((deck: any) => (
              <SingleDeck key={deck.id} deck={deck} onDeckDelete={handleDeckDelete} />
            ))}
            {isParamsOpen && <UserParams user={user} setRefresh={setRefresh} />}
        </div>
        </div>
      </div>
    </div>
  );
}