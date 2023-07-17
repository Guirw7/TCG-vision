import { openCardAdditionModal, closeCardAdditionModal } from './cardAdditionSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { axiosRequest } from '../../utils/axiosRequest';
import { getIDFromToken } from '../../utils/getIDFromToken';
import { addCardToDeck } from '../../utils/addCardToLibrary';
// import './styles.scss';

interface DeckProps {
  id: number;
  deck_name: string;
  deck_description: string;
  card_quantitity: number;
  user_id: number;
}

export default function CardAdditionModal({ cardID }: any) {
  const [deckList, setDeckList] = useState<DeckProps[] | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<any>('');

  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.cardAdditionModal.value);

  const closeModalFunction = () => {
    dispatch(closeCardAdditionModal());
  };

  const displayDeckList = async () => {
    const userID = getIDFromToken();
    const response = await axiosRequest('get', `https://daoust-jason-server.eddi.cloud/private/deck/${userID}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
      },
    });
    setDeckList(response);
    console.log(response);
  };

  const handleDeckChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeck(Number(event.target.value)); // Update the selected deck when the user changes the selection
  };

  const createDeck = async (event: any) => {
    event.preventDefault();
    console.log(selectedDeck);
    console.log(cardID);
    addCardToDeck(Number(selectedDeck), cardID);
  };

  useEffect(() => {
    displayDeckList();
  }, []);

  useEffect(() => {
    if (deckList && deckList.length > 0) {
      setSelectedDeck(deckList[0].id); // Set the default selected deck to the first deck in the list
    }
  }, [deckList]);

  return (
    <>
      <article className="card-addition-modal">
        <button onClick={(e) => { e.stopPropagation(); closeModalFunction(); }} className="form-card-addition-exit">X</button>
        <form onClick={(e) => { e.stopPropagation(); }} className="card-addition-modal-form">
          {deckList &&
            <select name="deck" value={selectedDeck} onChange={handleDeckChange}>Liste de vos decks
              {deckList.map((deck: DeckProps) => (
                <option key={deck.id} value={deck.id}>{deck.deck_name}</option>
              ))}
            </select>
          }
          <button type="submit" onClick={createDeck}>Ajouter</button>
          <button>Annuler</button>
        </form>
      </article>
    </>
  );
}
