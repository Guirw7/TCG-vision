import './styles.scss'
import { setSearch, clearSearch } from '../SearchResult/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import DeckSearchResult from '../DeckSearchResult';
import DeckList from '../DeckList';
import { getIDFromToken } from '../../utils/getIDFromToken';
import { axiosRequest } from '../../utils/axiosRequest';



export default function DeckEditorPage() {
    const userDeck = useSelector((state: any) => state.userDeck.value);
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const [deckName, setDeckName] = useState('');
    const [deckDescription, setDeckDescription] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        dispatch(setSearch(input));
      };


    const createDeck = async (data: any) => {
    const id = getIDFromToken();
    const route = 'deck';
    const url = `https://daoust-jason-server.eddi.cloud/private/${route}`;
    axiosRequest('post', url, {
        data: {
        deck_name: deckName,
        deck_description: deckDescription,
        set_code: userDeck,
        user_id: id
        },
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
        },
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log('Erreur lors de la requête', error);
    });
    };

    const onSubmit = (data: any) => {
        createDeck(data);
      };

    return (
        <div className='deck_editor-container'>
            <div className='deck_editor-container-background'>
                <h1 className='deck_editor-title'>Créateur de Deck</h1>
                <div className='deck_editor-editor'>
                    <div className='deck_editor-name-container'>
                        {/* <h2 className='deck_editor-name'>{deckName}</h2> */}
                        <input
                            value={deckName}
                            required
                            onChange={(event) => setDeckName(event.target.value)}
                            className="deck_editor-name-input"
                            placeholder="Nom du Deck"/>
                        <div className='deck_editor-actions'>
                            <button onClick={onSubmit} className='deck_editor-actions-button'>Sauvegarder</button>
                        </div>
                    </div>
                    <section className='deck_editor-deck-container'>
                    <div className='deck_editor-search-container'>
                        <div className='deck_editor-search-bar'>
                        <form onSubmit={handleSubmit} className="header-searchbar" action="">
                            <input value={input} onChange={(event) => setInput(event.target.value)} className ="header-searchbar__input" placeholder= "Votre recherche ici..." ></input>
                            <button type="submit"  className="header-searchbar__button">Rechercher</button>
                        </form>
                        </div>
                        <div className='deck_editor-search-results'>
                            <DeckSearchResult />
                        </div>
                    </div>
                    <div className='deck_editor-details-container'>
                        <div className='deck_editor-list-container'>
                            <DeckList deck={userDeck}/>
                        </div>
                        <div className='deck_editor-desc-container'>
                            {/* <p className='deck_editor-desc'>{deckDescription}</p> */}
                            <textarea
                                rows={12}
                                cols={46}
                                value={deckDescription}
                                maxLength={200}
                                onChange={(event) => setDeckDescription(event.target.value)}
                                className="deck_editor-desc-input"
                                placeholder="Description du Deck"/>
                        </div>
                    </div>
                    </section>
                </div>
            </div>
        </div>
    )
}