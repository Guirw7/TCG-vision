import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setUserDeck } from '../DeckEditorPage/userDeckSlice';
import "./styles.scss";

interface Card {
  id: number;
  name: string;
  type: string;
}

const DeckList: React.FC = () => {
  const dispatch = useDispatch();
  const userDeck = useSelector((state: RootState) => state.userDeck);
  const [cardData, setCardData] = useState<Card[]>([]);

  useEffect(() => {
    const fetchCardData = async () => {
      const cardPromises = userDeck.value.map((id) =>
        fetch(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}&language=fr`
        )
          .then((response) => response.json())
          .catch((error) => console.error(error))
      );

      const cardsData = await Promise.all(cardPromises);
      const extractedCardData = cardsData.map((cardData) => cardData.data[0]);
      setCardData(extractedCardData);
    };

    fetchCardData();
  }, [userDeck]);

  const handleCardClick = (cardId: number) => {
    const cardIndex = userDeck.value.findIndex((id) => id === cardId);
    if (cardIndex !== -1) {
      const updatedDeck = [...userDeck.value];
      updatedDeck.splice(cardIndex, 1);
      dispatch(setUserDeck(updatedDeck));
    }
  };

  const filteredMonsters = cardData.filter((card) =>
    [
      "Effect Monster",
      "Flip Effect Monster",
      "Flip Tuner Effect Monster",
      "Gemini Monster",
      "Normal Monster",
      "Normal Tuner Monster",
      "Pendulum Effect Monster",
      "Pendulum Effect Ritual Monster",
      "Pendulum Flip Effect Monster",
      "Pendulum Normal Monster",
      "Pendulum Tuner Effect Monster",
      "Ritual Effect Monster",
      "Ritual Monster",
      "Spirit Monster",
      "Toon Monster",
      "Tuner Monster",
      "Union Effect Monster",
    ].includes(card.type)
  );

  const filteredSpells = cardData.filter((card) => card.type === "Spell Card");

  const filteredTraps = cardData.filter((card) => card.type === "Trap Card");

  const filteredExtraDeck = cardData.filter((card) =>
    [
      "Fusion Monster",
      "Link Monster",
      "Pendulum Effect Fusion Monster",
      "Synchro Monster",
      "Synchro Pendulum Effect Monster",
      "Synchro Tuner Monster",
      "XYZ Monster",
      "XYZ Pendulum Effect Monster",
    ].includes(card.type)
  );

  return (
    <div>
      <h2>Monstres</h2>
      {filteredMonsters.map((card) => (
        <div
          className="decklist-item"
          key={card.id}
          onClick={() => handleCardClick(card.id)}
        >
          {card.name}
        </div>
      ))}

      <h2>Magies</h2>
      {filteredSpells.map((card) => (
        <div
          className="decklist-item"
          key={card.id}
          onClick={() => handleCardClick(card.id)}
        >
          {card.name}
        </div>
      ))}

      <h2>Pièges</h2>
      {filteredTraps.map((card) => (
        <div
          className="decklist-item"
          key={card.id}
          onClick={() => handleCardClick(card.id)}
        >
          {card.name}
        </div>
      ))}

      <h2>Extra Deck</h2>
      {filteredExtraDeck.map((card) => (
        <div
          className="decklist-item"
          key={card.id}
          onClick={() => handleCardClick(card.id)}
        >
          {card.name}
        </div>
      ))}
    </div>
  );
};

export default DeckList;
