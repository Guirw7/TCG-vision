import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// On importe le slice qui est dans ce dossier ⚠️
import { closeModal, clearCardID } from './modalSlice';

import './styles.scss';
import { set } from 'react-hook-form';

export interface ExtensionProps {
  set_code: string,
  set_name: string,
  set_price: string | number,
  set_rarity: string,
  set_rarity_code: string,
};


export default function CardModal() {
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState<any>(null);
  const [cardImage, setCardImage] = useState<any>(null);
  const [counter, setCounter] = useState<number>(1);
  const cardID = useSelector((state: any) => state.cardModal.element);
  const [selectedExtension, setSelectedExtension] = useState<string>("");
  const [extensionList, setExtensionList] = useState<ExtensionProps[]>([]);
 
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

  const optionHandler = (event: any) => {
    event.preventDefault();
    setSelectedExtension(event.target.value)
    setExtensionList([]);
    getCardDatabyExtension(event.target.value);
  };

  const getCardDatabyExtension = async (selectedExtension: string) => {
    const cardExtensions = cardData.card_sets;
    const filteredExtensions = cardExtensions.filter((extension: ExtensionProps) => {
      return extension.set_code === selectedExtension;
    });
    setExtensionList(filteredExtensions);
  };

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
              {
                cardData.level &&
                <p className='card-modal-level'>Niveau: {cardData.level}</p>
              }
              {
                cardData.race && 
                <p className='card-modal-race'>Archetype: {cardData.race}</p>
              }
              {
                cardData.attribute &&
                <p className='card-modal-attribute'>Attribut: {cardData.attribute}</p>
              }
              <div className='card-modal-stats'>
              {
                !!cardData.atk &&
                <p className='card-modal-stats-atk'>Attaque: {cardData.atk}</p>
              }
              {
                !!cardData.def &&
                <p className='card-modal-stats-def'>Défense: {cardData.def}</p>
              }
              {
                cardData.linkval &&
                <p className='card-modal-linkval'>LINK: {cardData.linkval}</p>
              }
              </div>
              <div className='card-modal-extension-rarity'>
                {
                  extensionList && (
                    extensionList.map((card, index) => {
                      return(
                        <span className='card-modal-extension-rarity-item' key={index}>{card.set_rarity}</span>
                      )
                    })
                  )
                }
              </div>
          </div>
        </section>
        <section className='card-modal-description'>
          <p className='card-modal-desc'>{cardData.desc}</p>
        </section>
        <form action="">
          <section className="card-modal-extension">
            <label className="card-modal-extension-label" htmlFor="">Nom de l'extension :</label>
            <select onChange={optionHandler} className='card-modal-extension-select'>
              <option value="">Sélectionnez une extension</option>
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
            <div className='card-modal-submit-buttons'>
              <button className='card-modal-submit-button-deck'>Ajouter au Deck</button>
              <button className='card-modal-submit-button-collection'>Ajouter à la Collection</button>
            </div>
          </div>
        </form>
        </article>
      </div>
    )
  )
};
