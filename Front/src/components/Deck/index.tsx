import { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal, setModalMessage } from '../LibraryModal/librarySlice';

import { axiosRequest } from '../../utils/axiosRequest';
import LibraryModal from '../LibraryModal';
import './styles.scss';

  // private :
  // /decks -> récupérer ses decks (GET)
  // deck -> créer un deck (POST, PUT, DELETE)
  // public : 
  // /deck/:id -> récupérer un deck (GET)

export default function Deck () {
  const modal = useSelector((state: any) => state.libraryModal.value);
  const dispatch = useDispatch();
  const [decks, setDecks] = useState([]);

  // useEffect(() => {
  //   axiosRequest('get', 'http://daoust-jason-server.eddi.cloud/decks')
  //   .then(data => {
  //     console.log(data);
  //     setDecks(data);
  //   })
  //   .catch(error => {
  //     console.log('Erreur lors de la requête', error);
  //   });
  // }, [decks]);

  const createDeck = () => {
    dispatch(openModal());
  };

  const testDeCo = async () => {
    axiosRequest('get', 'https://daoust-jason-server.eddi.cloud/profil', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
      },
    });
  };

  const getDecks = async () => {
    axiosRequest('get', 'https://daoust-jason-server.eddi.cloud/decks/16', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
      },
    });
  };

  const getAllDecks = async () => {
    axiosRequest('get', 'https://daoust-jason-server.eddi.cloud/deck/');
  };

  const getDeckByID = async () => {
    axiosRequest('get', 'https://daoust-jason-server.eddi.cloud/deck/1');
  };

  return (
    <div className='deck-container'>
      <div className='deck-container-background'>
        <h1 className='page-title'>hello world</h1>
        <button onClick={createDeck}>Ajouter un deck</button>
        <button onClick={getDecks}>Choper les decks</button>
        <button onClick={testDeCo}>Test de connexion (liste des profils)</button>
        <button onClick={getAllDecks}>Choper tous les decks (public)</button>
        <button onClick={getDeckByID}>Choper le deck à l'ID 10</button>
      </div>
      {
        (modal) && (
            <LibraryModal />
        )
      }
    </div>
  )
};




