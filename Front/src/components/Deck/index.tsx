import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../LibraryModal/librarySlice';
import { useNavigate } from 'react-router-dom';

import { axiosRequest } from '../../utils/axiosRequest';
import { getIDFromToken } from '../../utils/getIDFromToken';
import LibraryModal from '../LibraryModal';
import SingleDeck from '../SingleDeck';
// import './styles.scss';

export default function Deck() {
  const modal = useSelector((state: any) => state.libraryModal.value);
  const dispatch = useDispatch();
  const [decks, setDecks] = useState([]);
  const [request, setRequest] = useState<string>('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    setIsLoggedIn(jwt !== null);
  }, []);

  const getAllDecks = async () => {
    setRequest('');
    axiosRequest('get', 'https://daoust-jason-server.eddi.cloud/public/decks')
      .then((data) => {
        console.log(data);
        setDecks(data);
      })
      .catch((error) => {
        console.log('Erreur lors de la requête', error);
      });
  };

  const getUserDecks = () => {
    setRequest('');
    const id = getIDFromToken();
    console.log(id);
    const url = `https://daoust-jason-server.eddi.cloud/private/deck/${id}`;
    axiosRequest('get', url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
      },
    })
      .then((data) => {
        console.log(data);
        setDecks(data);
      })
      .catch((error) => {
        console.log('Erreur lors de la requête', error);
      });
  };

  const userRequest = (event: any) => {
    event.preventDefault();
    const value = event.target.value;
    setRequest(value);
  };

  useEffect(() => {
    if (request === 'getAllDecks') {
      getAllDecks();
    }
    if (request === 'getUserDecks') {
      getUserDecks();
    }
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
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
      },
    });
  };

  const getDecks = async () => {
    axiosRequest('get', 'https://daoust-jason-server.eddi.cloud/private/decks/1', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
      },
    });
  };

  return (
    <div className="deck-container">
      <div className="deck-container-background">
        <h1 className="page-title">Decks</h1>
        {modal && <LibraryModal />}
        <div className="decks-body">
          <div className="decks-actions">
            {isLoggedIn && (
              <>
              <button className="button" onClick={() => navigate('/deck-creator')}>Créer un deck</button>
            <button className="button" onClick={userRequest} value="getUserDecks">
              Vos decks
            </button>
              </>
            )}
            <button className="button" onClick={userRequest} value="getAllDecks">
              Tous les decks de la communauté
            </button>
          </div>
          <div className="decks-display">
            {decks.map((deck: any) => {
              return <SingleDeck key={deck.id} deck={deck} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
