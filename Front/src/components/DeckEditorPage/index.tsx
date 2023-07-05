import './styles.scss'
import { setSearch, clearSearch } from '../SearchResult/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import DeckSearchResult from '../DeckSearchResult';
import DeckList from '../DeckList';


export default function DeckEditorPage() {
    const userDeck = useSelector((state: any) => state.userDeck.value);
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        dispatch(setSearch(input));
      };

    return (
        <div className='deck_editor-container'>
            <div className='deck_editor-container-background'>
                <h1 className='deck_editor-title'>Editeur de Deck</h1>
                <div className='deck_editor-editor'>

                    <div className='deck_editor-name-container'>
                        <h2 className='deck_editor-name'>Nom du Deck</h2>
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

                        </div>
                    </div>
                    </section>
                </div>
            </div>
        </div>
    )
}