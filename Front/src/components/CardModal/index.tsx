import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// On importe le slice qui est dans ce dossier ⚠️
import { closeModal, clearCardID } from './modalSlice';

import './styles.scss';

export default function CardModal() {
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState<any>(null);``
  const [cardImage, setCardImage] = useState<any>(null);
  const [counter, setCounter] = useState<number>(1);
  const cardID = useSelector((state: any) => state.cardModal.element);

  useEffect(() => {
    const fetchData = async () => {
      const responseAPI = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardID}&language=fr`);
      const data = await responseAPI.json();
      if (data) {
        setCardData(data.data[0]);
        const imageUrl = `https://daoust-jason-server.eddi.cloud/card_images/${cardID}.jpg`
        setCardImage(imageUrl);
      }
    };
    if (cardID) {
      fetchData();
    };
  }, [cardID]);

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
    dispatch(clearCardID());
  };

  return (
    cardData && (
      <div onClick={closeModalFunction} className='behind-card-modal'>
        <article onClick={(e) => e.stopPropagation()} className = "card-modal">
        <button onClick={(e) => {e.stopPropagation(); closeModalFunction();}} className='card-modal-exit'>X</button>
          <h2 className='card-modal-name'>{cardData.name}</h2>
          <section className='card-modal-informations'>
            <img className="card-modal-image" src={cardImage}></img>
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
              {cardData.card_sets.map((extension: any, index: number) => {
                return (
                  <option key= {index} value={extension.set_code}>{extension.set_name}</option>
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
};