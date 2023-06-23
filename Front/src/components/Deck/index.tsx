import { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal, setModalMessage } from '../FormModal/modalSlice';

import { axiosRequest } from '../../utils/axiosRequest';
import LibraryModal from '../LibraryModal';
import './styles.scss';

  // private :
  // /decks -> récupérer ses decks (GET)
  // deck -> créer un deck (POST, PUT, DELETE)
  // public : 
  // /deck/:id -> récupérer un deck (GET)

export default function Deck () {
  const modal = useSelector((state: any) => state.formModal.value);
  const dispatch = useDispatch();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    axiosRequest('get', 'http://daoust-jason-server.eddi.cloud/decks')
    .then(data => {
      console.log(data);
      setDecks(data);
    })
    .catch(error => {
      console.log('Erreur lors de la requête', error);
    });
  }, [decks]);

  const createDeck = async () => {
    dispatch(openModal());
    // const route = 'deck';
    // const url = `http://daoust-jason-server.eddi.cloud/${route}`;
    // axiosRequest('post', url, {
    //   data: {
    //     deck_name: 'deck_name', // Obligatoire
    //     deck_description: 'deck_description', //Facultatif
    //   },
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    // })
    // .then(data => {
    //   console.log(data);
    // })
    // .catch(error => {
    //   console.log('Erreur lors de la requête', error);
    //   // message d'erreur
    // });
  }

  return (
    <div className='deck-container'>
      <div className='deck-container-background'>
        <h1 className='page-title'>hello world</h1>
        <button onClick={createDeck}>+</button>
      </div>
      {
        (modal) && (
            <LibraryModal />
        )
      }
    </div>
  )
};




