import { useState } from 'react';


import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '../Card/modalSlice';

// import state from '../Card/modalSlice';

import Card from '../Card';
import CardDisplayer from '../CardDisplayer';
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
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const modal = useSelector((state: RootState) => state.modal.value);
  const dispatch = useDispatch();
  /*
  useEffect(() => {
  const fetchCards = async () => {
    // les calls API sont à faire en français (espace = %20)
    const response: any = await fetch('npm');
    const data: any | undefined = await response.json();
    setCard(data.data[0]);
    return data;
    fetchCards();
  }
}, []);
*/
/* -- handleClick à l'ancienne
const handleClick = async () => {
  const dragonCanonXYZ = 91998119;
  const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${dragonCanonXYZ}&language=fr`);
  const data: any = await response.json();
  if (data) {
    setSingleCard(data.data[0]);
  }
---------------------------------*/

// handleClick avec Redux
  const handleClick = () => {
    const dragonCanonXYZ = 91998119;
    setSelectedCard(dragonCanonXYZ);
    // Passer l'état de la modale à true dans le slice Redux
    dispatch(openModal());
  };



  return (
    <div className='game-container'>
      <div className="game-container-background">
        <h1 className="game-title">Yu-Gi-Oh Trading Card Game</h1>
        {/* <button onClick={handleClick}>Clique moi</button>
        {
          (modal)  && (
            <Card selectedCard={selectedCard}/>
          )
        }
        {
          (!modal) && (
            <h1>hello world</h1>
          )
        } */}
        <CardDisplayer />
      </div>
    </div>
  )
};


