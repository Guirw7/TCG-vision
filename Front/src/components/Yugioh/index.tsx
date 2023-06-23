import { useSelector } from 'react-redux';
import { RootState } from '../../store';

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
};

export default function Yugioh() {
  const modal = useSelector((state: RootState) => state.cardModal.value);
  return (
    <div className='game-container'>
      <div className="game-container-background">
        <h1 className="game-title">Yu-Gi-Oh! Trading Card Game</h1>
        <CardsDisplayer />
        {
          (modal && <CardModal/>)
        }
      </div>
    </div>
  )
};
