import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { openModal, closeModal } from './modalSlice';

import dragon from '../../../../../../../../kevin/Desktop/91998119.jpg';
import './styles.scss';

export default function Card({selectedCard}: any) {
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState<any>(null);
  const [cardID, setCardID] = useState<any>(selectedCard);
  const [counter, setCounter] = useState<number>(1);

  useEffect(() => {
    const fetchCard = async () => {
      const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardID}&language=fr`);
      const data = await response.json();
      if (data) {
        setCardData(data.data[0]);
      }
    };
    fetchCard();
  }, [cardID]);

  if (!cardData) {
    return null;
  };

  const increment = (event: any) => {
    event?.preventDefault();
    setCounter(counter + 1);
  };
  const decrement = (event: any) => {
    event?.preventDefault();
    if (counter === 0) {
      return;
    };
    setCounter(counter - 1);
  };

  const closeModalFunction = () => {
    dispatch(closeModal());
  }

  return (
    cardData && (
      <div onClick={closeModalFunction} className='behind-card-modal'>
        <article onClick={(e) => e.stopPropagation()} className = "card-modal">
        <button onClick={(e) => {e.stopPropagation(); closeModalFunction();}} className='card-modal-exit'>X</button>
          <h2 className='card-modal-name'>{cardData.name}</h2>
          <section className='card-modal-informations'>
            <img className="card-modal-image" src={dragon}></img>
            <div className='card-modal-data'>
              <p className='card-modal-type'>Type: {cardData.type}</p>
              <p className='card-modal-level'>Niveau: {cardData.level}</p>
              <p className='card-modal-archetype'>Archetype: {cardData.archetype}</p>
              <p className='card-modal-attribute'>Attribut: {cardData.attribute}</p>
              <p className='card-modal-stats'>Attaque: {cardData.atk} Défense: {cardData.def}</p>
          </div>
        </section>
        <section className='card-modal-description'>
          <p className='card-modal-desc'>{cardData.desc}</p>
        </section>
        <form action="">
          <section className="card-modal-extension">
            <label className="card-modal-extension-label" htmlFor="">Nom de l'extension :</label>
            <select className='card-modal-extension-select'>
              {cardData.card_sets.map((extension: any) => {
                return (
                  <option key= {extension.set_name} value={extension.set_code}>{extension.set_name}</option>
                )
              })}
            </select>
          </section>
          <div className='card-modal-buttons'>
            <div>
              <section className='card-modal-quantity'>
                <button onClick={decrement} className='card-modal-quantity-decrement'>-</button>
                <p className='card-modal-quantity-counter'>{counter}</p>
                <button onClick={increment} className='card-modal-quantity-increment'>+</button>
              </section>
            </div>
            <button className='card-modal-submit-button'>Ajouter à la Collection</button>
          </div>
        </form>
        </article>
      </div>
    )
  )
}
