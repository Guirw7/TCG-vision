import { useState, useEffect } from 'react';

import Card from '../Card';
import './styles.scss';


export interface Card {
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
  const [selectedCard, setSelectedCard] = useState<boolean>(false);
  const [card, setCard] = useState<Card | undefined>(undefined);
  const [singleCard, setSingleCard] = useState<any | undefined>(undefined);
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

  const handleClick = async () => {
    // On récupère l'ID de la carte sur laquelle l'utilisateur a cliqué
    // req.params.id
    // On fait la requête avec l'ID
    // On fait la requête avec l'ID
    const dragonCanonXYZ = 91998119;
    const carteNomSuperLong = 29913783;
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${carteNomSuperLong}&language=fr`);
    const data: any = await response.json();
    if (data) {
      setSingleCard(data.data[0]);
      setSelectedCard(true);
    }
    
    // On envoie les données de la carte à la page Card
    // On affiche la page Card
  };

  return (
    <div className='game-container'>
      <div className="game-container-background">
        <h1 className="game-title">Yu-Gi-Oh Trading Card Game</h1>
        <button onClick={handleClick} value={singleCard}>Clique moi</button>
        {
          selectedCard && (
            <Card singleCard={singleCard}/>
          )
        }
      </div>
    </div>
  )
}