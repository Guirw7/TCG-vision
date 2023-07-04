import { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../LibraryModal/librarySlice';

import { axiosRequest } from '../../utils/axiosRequest';
import { getIDFromToken } from '../../utils/getIDFromToken';
import LibraryModal from '../LibraryModal';
import DeckList from '../DeckList';
import DeckDisplayer from '../DeckDisplayer';
import './styles.scss';

export default function Deck () {
  const modal = useSelector((state: any) => state.libraryModal.value);
  const dispatch = useDispatch();
  const [decks, setDecks] = useState([]);
  const [request, setRequest] = useState<string>('');

  const getAllDecks = async () => {
    setRequest('');
    axiosRequest('get', 'https://daoust-jason-server.eddi.cloud/public/decks')
    .then(data => {
      console.log(data);
      setDecks(data);
    })
    .catch(error => {
      console.log('Erreur lors de la requête', error);
    });
  };

  const getUserDecks = () => {
    setRequest('');
      const id = getIDFromToken();
      console.log(id);
      const url = `https://daoust-jason-server.eddi.cloud/private/deck/${id}`;
      axiosRequest('get', url, {
        'headers': {
          'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
        },
      })
      .then(data => {
        console.log(data);
        setDecks(data);
      })
      .catch(error => {
        console.log('Erreur lors de la requête', error);
      });
  };

  const userRequest = (event: any) => {
    event.preventDefault();
    const value = event.target.value;
    setRequest(value);
  }

  useEffect(() => {
    if (request === 'getAllDecks') {
      getAllDecks();
    };
    if (request === 'getUserDecks') {
      getUserDecks();
    };
    if (!request) {
      return;
    }
  }, [request]);

  const createDeck = () => {
    dispatch(openModal());
  };

  const testDeCo = async () => {
    axiosRequest('get', 'https://daoust-jason-server.eddi.cloud/private/profil', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
      },
    });
  };

  const getDecks = async () => {
    axiosRequest('get', 'https://daoust-jason-server.eddi.cloud/private/decks/1', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
      },
    });
  };

  return (
    <div className='deck-container'>
      <div className='deck-container-background'>
        <h1 className='page-title'>Decks</h1>
      {
        (modal) && (
            <LibraryModal />
        )
      }
        <div className='decks-display'>
          <button onClick={createDeck}>Créer un deck</button>
          <button onClick={userRequest} value='getAllDecks'>Tous les decks de la communauté</button>
          <button onClick={userRequest} value='getUserDecks'>Vos decks</button>
          <button onClick={testDeCo}>Liste des utilisateurs</button>
          <DeckDisplayer data = {decks}/>
          {/* <DeckList decks={decks}/> */}
        </div>
      </div>
    </div>
  )
};




