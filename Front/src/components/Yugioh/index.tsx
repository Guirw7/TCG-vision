import { useState, useEffect } from 'react';

import './styles.scss';


interface Card {
  id: number;
  name: string;
  type: string;
  desc: string;
  atk: number;
  def: number;
  level: number;
  race: string;
  attribute: string;
  name_en: string;
  archetype: string;
  card_sets: any;
  card_images: any;
  card_prices: any;
}

export default function Yugioh() {
  const [card, setCard] = useState<Card | undefined>(undefined);
  useEffect(() => {
  const fetchCards = async () => {
    // les calls API sont à faire en français (espace = %20)
    const response: any = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Canon%20Dragon-XYZ&language=fr');
    const data: any | undefined = await response.json();
    setCard(data.data[0]);
    return data;
  }
  fetchCards();
}, []);

  return(
    <div className='game-container'>
      <div className="game-container-background">
        <h1 className="game-title">Yu-Gi-Oh Trading Card Game</h1>
      </div>
    </div>
  )
}