const DeckList = ({ decks }: { decks: any[] }) => {
  const filteredMonsters = decks.filter((card) =>
    ["Effect Monster", 
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
    "Union Effect Monster"
  ].includes(card.type)
  );

  const filteredSpells = decks.filter((card) => card.type === "Spell Card");

  const filteredTraps = decks.filter((card) => card.type === "Trap Card");

  const filteredExtraDeck = decks.filter((card) =>
    ["Fusion Monster", 
    "Link Monster", 
    "Pendulum Effect Fusion Monster", 
    "Synchro Monster", 
    "Synchro Pendulum Effect Monster", 
    "Synchro Tuner Monster", 
    "XYZ Monster", 
    "XYZ Pendulum Effect Monster"
  ].includes(card.type)
  );

  return (
    <div>
      <h2>Monstres</h2>
      {filteredMonsters.map((card) => (
        <div key={card.id}>{card.name}</div>
      ))}

      <h2>Magies</h2>
      {filteredSpells.map((card) => (
        <div key={card.id}>{card.name}</div>
      ))}

      <h2>Pièges</h2>
      {filteredTraps.map((card) => (
        <div key={card.id}>{card.name}</div>
      ))}

      <h2>Extra Deck</h2>
      {filteredExtraDeck.map((card) => (
        <div key={card.id}>{card.name}</div>
      ))}
    </div>
  );
};

export default DeckList;