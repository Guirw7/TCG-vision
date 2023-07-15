import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, clearCardID } from './modalSlice';
import { onRefreshRedux, offRefreshRedux } from './refreshSlice';
import { axiosRequest } from '../../utils/axiosRequest';
import CardAdditionModal from '../CardAdditionModal';
import { getIDFromToken } from '../../utils/getIDFromToken';


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
  const [selectedExtension, setSelectedExtension] = useState<string[]>([]);
  const [extensionList, setExtensionList] = useState<ExtensionProps[]>([]);
  const cardAdditionModal = useSelector((state: any) => state.cardAdditionModal.value);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [collections, setCollections] = useState<any>([]);
  const [selectedCollection, setSelectedCollection] = useState<any>(null);
  const refreshRedux = useSelector((state: any) => state.refreshRedux.value);
  

  useEffect(() => {
    const token = sessionStorage.getItem('jwt');
    if (token) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    };
  }), [];

  useEffect(() => {
    if (collections && collections.length > 0) {
      setSelectedCollection(collections[0].id); // Set the default selected deck to the first deck in the list
    }
  }, [collections]);

  useEffect(() => {
    const id = getIDFromToken();
    const url = `https://daoust-jason-server.eddi.cloud/private/collection/collection/${id}`;
    axiosRequest('get', url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      }
    })
    .then(data => {
      setCollections(data);

    })
    .catch(error => {
      console.log('Erreur lors de la requête', error);
    });
  }, []);

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

  const collectionOptionHandler = (event: any) => {
    event.preventDefault();
    setSelectedCollection(event.target.value)
    
  };

  const getCardDatabyExtension = async (selectedExtension: string) => {
    const cardExtensions = cardData.card_sets;
    const filteredExtensions = cardExtensions.filter((extension: ExtensionProps) => {
      return extension.set_code === selectedExtension;
    });
    setExtensionList(filteredExtensions);
  };

  useEffect(() => {
    axiosRequest('get', `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardID}&language=fr`)
    .then(data => {
      setCardData(data.data[0]);
      const imageUrl = `https://daoust-jason-server.eddi.cloud/card_images/${cardID}.jpg`
      setCardImage(imageUrl);
    })
    .catch(error => {
      console.log('Erreur lors de la requête', error);
    });
  }, [cardID]);

  const addCardToCollection = (event: any) => {
    event.preventDefault();
    let array = [selectedExtension];
    // console.log(parseInt(selectedCollection), counter, array);
    for (let i = 0; i < counter; i++) {
      dispatch(offRefreshRedux());

      const id = getIDFromToken();
      const url = `https://daoust-jason-server.eddi.cloud/private/collection/${parseInt(selectedCollection)}`;
      axiosRequest('put', url, {
        data: {
          set_code: array,
          user_id: id
          },
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
          },
      })
        .then(data => {
          console.log(refreshRedux)
          closeModalFunction();
        })
        .catch(error => {
          console.log('Erreur lors de la requête', error);
        });
      dispatch(onRefreshRedux());

        };
  }
  

  




  return (
    cardData && (
      <div onClick={closeModalFunction} className='modal-background'>
        <article onClick={(e) => e.stopPropagation()} className = "modal-body">
        <button onClick={(e) => {e.stopPropagation(); closeModalFunction();}} className='modal-button-exit'>X</button>
        <div className='modal-title-container'>
          <h1 className='modal-title-lg'>{cardData.name}</h1>
          
                {
                  extensionList && (
                    extensionList.map((card, index) => {
                      return(
                        <span className='card-modal-rarity' key={index}>{card.set_rarity}</span>
                      )
                    })
                  )
                }
          
        </div>
          <section className='card-modal-informations'>
            <img className="card-modal-image" src={cardImage}></img>
            <div className='card-modal-data-container'>
              <p className='card-modal-info'>{cardData.type}</p>
              {
                cardData.level &&
                <p className='card-modal-info'>Niveau: {cardData.level}</p>
              }
              {
                cardData.race && 
                <p className='card-modal-info'>Type: {cardData.race}</p>
              }
              {
                cardData.attribute &&
                <p className='card-modal-info'>Attribut: {cardData.attribute}</p>
              }

              {
                cardData.atk >= 0 &&
                <p className='card-modal-info'>Attaque: {cardData.atk}</p>
              }
              {
                cardData.def >= 0 &&
                <p className='card-modal-info'>Défense: {cardData.def}</p>
              }
              {
                cardData.linkval &&
                <p className='card-modal-linkval'>LINK: {cardData.linkval}</p>
              }
             

          </div>
        </section>
        <section className='card-modal-description'>
          <p className='card-modal-desc'>{cardData.desc}</p>
        </section>
        
          <section className="card-modal-extension">
            <label htmlFor="">Nom de l'extension : </label>
            <select onChange={optionHandler} className='select'>
              <option value="">Sélectionnez une extension</option>
              {cardData.card_sets.map((extension: any, index: number) => {
                return (
                  <option key= {index} value={extension.set_code}>{extension.set_code} | {extension.set_name} | {extension.set_rarity}</option>
                )
              })}
            </select>
          </section>

              {isConnected && (
          <div className='card-modal-extension'>
              <section className='card-modal-quantity'>
                <button onClick={decrement} className='button'>-</button>
                <p className='card-modal-quantity-counter'>{counter}</p>
                <button onClick={increment} className='button'>+</button>
              </section>
              <select onChange={collectionOptionHandler} className='select small'>
                {collections.map((collection: any, index: number) => {
                  return (
                    <option key={index} value={collection.id}>{collection.collection_name}</option>
                  )
                })}
              </select>
              <button onClick={addCardToCollection} type='submit' className='button'>Ajouter a la collection</button>
          </div>
              )}
        
        </article>
      </div>
    )
  )
};
