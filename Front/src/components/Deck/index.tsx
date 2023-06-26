import { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal, setModalMessage } from '../LibraryModal/librarySlice';

import { axiosRequest } from '../../utils/axiosRequest';
import LibraryModal from '../LibraryModal';
import './styles.scss';
import { set } from 'react-hook-form';

  // private :
  // /decks -> récupérer ses decks (GET)
  // deck -> créer un deck (POST, PUT, DELETE)
  // public : 
  // /deck/:id -> récupérer un deck (GET)

export default function Deck () {
  const modal = useSelector((state: any) => state.libraryModal.value);
  const session = useSelector((state: any) => state.session.value)
  const dispatch = useDispatch();
  const [decks, setDecks] = useState([]);
  const [request, setRequest] = useState<string>('');

  const getAllDecks = async () => {
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
    const token = sessionStorage.getItem('jwt');
    if (!token) {
      console.log('Vous devez être connecté');
      return
    };
    if (token) {
      const decodeToken = (token: string) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const jsonObject = JSON.parse(jsonPayload);
        const id = jsonObject.data.id;
        return id;
      };
      const id = decodeToken(token);
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
  }, [request]);

  const createDeck = () => {
    dispatch(openModal());
  };

  /* Choper les profils */
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

  // const getDeckByID = async () => {
  //   axiosRequest('get', 'https://daoust-jason-server.eddi.cloud/deck/1');
  // };
  

  // const debuggingTest = async () => {
  //   axiosRequest('get', 'https://daoust-jason-server.eddi.cloud/private/deck/1', {
  //     headers : {
  //       'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
  //     },
  //   });
  // };

  return (
    <div className='deck-container'>
      <div className='deck-container-background'>
        <h1 className='page-title'>Decks</h1>
      {/* {
        (modal) && (
            <LibraryModal />
        )
      } */}
      {/* {
        (session) && ( */}
          <div className='decks-display'>
            <button onClick={userRequest} value='getAllDecks'>Tous les decks de la communauté</button>
            <button onClick={userRequest} value='getUserDecks'>Vos decks</button>
            <button>Deck d'un utilisateur</button>
          </div>
        {/* )
      } */}
      </div>
    </div>
  )
};




