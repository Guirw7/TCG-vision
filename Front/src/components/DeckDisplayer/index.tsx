import { useState, useEffect } from 'react';
import DeckList from '../DeckList';

import './styles.scss';

export default function DeckDisplayer(data: any) {
  const [decks, setDecks] = useState<any>(null);
  const [selectedDeck, setSelectedDeck] = useState<any>(null);
  const [cardList, setCardList] = useState<any>(null);
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    setDecks(data.data);
    if (selectedDeck) {
      // console.log(selectedDeck.set_code);
    }
  }, [data, selectedDeck]);

  const getDeck = (deck: any) => (event: any) => {
    event.preventDefault();
    // console.log(deck);
    setSelectedDeck(deck);
    setCardList(deck.set_code);
  }

  return (
    <div>
      {decks && (
        <ul className='buttons'>
          {decks.map((deck: any) => (
            <li className='button' key={deck.id}>
              <button className='deck-buttons'onClick={getDeck(deck)}>{deck.deck_name}</button>
            </li>
          ))}
        </ul>
      )}
      {
        selectedDeck && (
          <>
            <h2 className='deck-name'>{selectedDeck.deck_name}</h2>
            <p className='deck-description'> {selectedDeck.deck_description}</p>
            {selectedDeck.set_code && (
              <DeckList deck={selectedDeck.set_code} />
          )}
          </>
        )
      }
    </div>
  );
  
}
  