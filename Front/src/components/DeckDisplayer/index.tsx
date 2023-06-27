import { useState, useEffect } from 'react';

import './styles.scss';

export default function DeckDisplayer(data: any) {
  const [decks, setDecks] = useState<any>(null);
  const [selectedDeck, setSelectedDeck] = useState<any>(null);
  const [cardList, setCardList] = useState<any>(null);

  useEffect(() => {
    setDecks(data.data);
  }, [data]);

  const getDeck = (deck: any) => (event: any) => {
    event.preventDefault();
    console.log(deck);
    setSelectedDeck(deck);
    setCardList(deck.set_code);
  }

  return (
    <div>
      {decks && (
        <ul className='buttons'>
          {decks.map((deck: any) => (
            <li className='button' key={deck.id}>
              <button onClick={getDeck(deck)}>{deck.deck_name}</button>
            </li>
          ))}
        </ul>
      )}
      {
        selectedDeck && (
          <>
            <h2>{selectedDeck.deck_name}</h2>
            <p>{selectedDeck.deck_description}</p>
            {selectedDeck.set_code && (
              <ul>
                {selectedDeck.set_code.map((card: any, index: number) => (
                  <li key={index}>{card}</li>
                ))}
              </ul>
            )}
          </>
        )
      }
    </div>
  );
}
  