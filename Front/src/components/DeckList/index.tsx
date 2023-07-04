import { useEffect, useState } from "react";

const DeckList = ({ deck }: { deck: any[] }) => {
  const [cardData, setCardData] = useState<any[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState<any[]>([]);
  const [filteredSpells, setFilteredSpells] = useState<any[]>([]);
  const [filteredTraps, setFilteredTraps] = useState<any[]>([]);
  const [filteredExtraDeck, setFilteredExtraDeck] = useState<any[]>([]);

  useEffect(() => {
    const fetchCardData = async () => {
      const cardPromises = deck.map((id) =>
        fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}&language=fr`)
          .then((response) => response.json())
          .catch((error) => console.error(error))
      );
  
      const cardsData = await Promise.all(cardPromises);
      const extractedCardData = cardsData.map((cardData) => cardData.data[0]); // Extraction des données réelles des cartes
      setCardData(extractedCardData);
    };
  
    fetchCardData();
  }, [deck]);

  useEffect(() => {
    setCardData([]);
  }, [deck]);
  

  useEffect(() => {
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

    setFilteredMonsters(filteredMonsters);
    setFilteredSpells(filteredSpells);
    setFilteredTraps(filteredTraps);
    setFilteredExtraDeck(filteredExtraDeck);
  }, [cardData]);

  return (
    <div>
      <h2>Monstres</h2>
      {filteredMonsters.map((card, index) => (
        <div key={index}>{card.name}</div>
      ))}

      <h2>Magies</h2>
      {filteredSpells.map((card, index) => (
        <div key={index}>{card.name}</div>
      ))}

      <h2>Pièges</h2>
      {filteredTraps.map((card, index) => (
        <div key={index}>{card.name}</div>
      ))}

      <h2>Extra Deck</h2>
      {filteredExtraDeck.map((card, index) => (
        <div key={index}>{card.name}</div>
      ))}
    </div>
  );
};

export default DeckList;
