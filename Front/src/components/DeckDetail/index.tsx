import './styles.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import DeckSearchResult from '../DeckSearchResult';
import DeckDetailList from '../DeckDetailList';
import { useNavigate } from 'react-router-dom'
import { axiosRequest } from '../../utils/axiosRequest';
import { set } from 'react-hook-form';

export default function DeckEditorPage() {
    const dispatch = useDispatch();
    const [deckName, setDeckName] = useState('');
    const [deckDescription, setDeckDescription] = useState('');
    const singleDeck = useSelector((state: any) => state.singleDeck.value);
    const [setCodes, setSetCodes] = useState([]);
    const navigate = useNavigate();

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

    return (
      <div className='deck_editor-container'>
          <div className='deck_editor-container-background'>
              <h1 className='deck_editor-title'>{deckName}</h1>
              <div className='deck_editor-editor'>
                  <div className='deck_editor-name-container'>
                      {/* <h2 className='deck_editor-name'>{deckName}</h2> */}
                      <div className='deck_editor-actions'>
                          <button onClick={() => navigate('/profil')} className='deck_editor-actions-button'>Retour</button>
                      </div>
                  </div>
                  <section className='deck_editor-deck-container'>
                  <div className='deck_editor-search-container'>
                      <div className='deck_editor-search-results'>
                      {setCodes.map((setCode, index) => (
                  <article className='card-article' key={index}>
                    <img className='card-article-image' src={`http://daoust-jason-server.eddi.cloud/card_images/${setCode}.jpg`} />
                    <p className='card-article-name'>{setCode}</p>
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