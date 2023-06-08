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
    const response: any = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Kuriboh&language=fr');
    const data: any | undefined = await response.json();
    setCard(data.data[0]);
    return data;
    
  }
  fetchCards();
}, []);

  return(
    <div className='game-container'>
      <div className="game-container-background">
        <p className="game-title">Yu-Gi-Oh Trading Card Game</p>
        <div className='cards-container'>
          {card && (
            <article className='card-item'>
              <div className="card-item-infos">
                <img src='' alt="" />
                <p>{card.name}</p>
                <p>{card.id}</p>
                <p>{card.type}</p>
                <p>{card.desc}</p>
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}