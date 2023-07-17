// import './styles.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import DeckSearchResult from '../DeckSearchResult';
import DeckDetailList from '../DeckDetailList';
import { useNavigate } from 'react-router-dom'
import { axiosRequest } from '../../utils/axiosRequest';
import { set } from 'react-hook-form';

export default function DeckEditorPage() {
    // const dispatch = useDispatch();
    const [deckName, setDeckName] = useState('');
    const [deckDescription, setDeckDescription] = useState('');
    const singleDeck = useSelector((state: any) => state.singleDeck.value);
    const [setCodes, setSetCodes] = useState([]);
    const navigate = useNavigate();
    const [userCards, setUserCards] = useState<any>([]);

      useEffect(() => {
            const route = `decks/${singleDeck}`;
            const url = `https://daoust-jason-server.eddi.cloud/public/${route}`;
            
            axiosRequest('get', url, {

            })
            .then(response => {
                console.log(response);
                setDeckName(response.deck_name);
                console.log(response.deck_name);
                setDeckDescription(response.deck_description);
                console.log(response.deck_description);
                setSetCodes(response.set_code);
                console.log(response.set_code);
                
            })
            .catch(error => {
                console.log('Erreur lors de la requête', error);
            });
        }, []);


        useEffect(() => {
            const fetchCardData = async () => {
              const cardPromises = setCodes.map((id) =>
                fetch(
                  `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}&language=fr`
                )
                  .then((response) => response.json())
                  .catch((error) => console.error(error))
              );
        
              const cardsData = await Promise.all(cardPromises);
              const extractedCardData = cardsData.map((cardData) => cardData.data[0]);
              setUserCards(extractedCardData);
            };
        
            fetchCardData();
          }, [setCodes]);






    return (
      <div className='deck_editor-container'>
          <div className='deck_editor-container-background'>
              <h1 className='deck_editor-title'>{deckName}</h1>
              <div className='deck_editor-editor'>
                  <div className='deck_editor-name-container'>
                      {/* <h2 className='deck_editor-name'>{deckName}</h2> */}
                      <div className='deck_editor-actions'>
                          <button onClick={() => navigate('/profil')} className='button'>Retour</button>
                      </div>
                  </div>
                  <section className='deck_editor-deck-container'>
                  <div className='deck_editor-search-container'>
                      <div className='deck_editor-search-results'>
                      {userCards.map((card:any, index:number) => (
                  <article className='card-article' key={index}>
                    <img className='card-article-image' src={`https://daoust-jason-server.eddi.cloud/card_images/${card.id}.jpg`} />
                    <p className='card-article-name'>{card.name}</p>
                  </article>
                ))}
                      </div>
                  </div>
                  <div className='deck_editor-details-container'>
                      <div className='deck_editor-list-container'>
                          <DeckDetailList userDeck={setCodes}/>
                      </div>
                      <div className='deck_editor-desc-container'>
                         <p className='deck_editor-desc'>{deckDescription}</p>
                      </div>
                  </div>
                  </section>
              </div>
          </div>
      </div>
  )
}