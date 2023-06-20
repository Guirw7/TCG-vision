import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// import state from '../Card/modalSlice';

import CardModal from '../CardModal';
import CardsDisplayer from '../CardsDisplayer';
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
  const modal = useSelector((state: RootState) => state.cardModal.value);
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

  return (
    <div className='game-container'>
      <div className="game-container-background">
        <h1 className="game-title">Yu-Gi-Oh Trading Card Game</h1>
        <CardsDisplayer />
        {
          (modal && <CardModal/>)
        }
      </div>
    </div>
  )
};
