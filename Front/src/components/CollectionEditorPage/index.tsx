import { setSearch, clearSearch } from '../SearchResult/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CollectionSearchResults from '../CollectionSearchResults';
import CardModal from '../CardModal';
import { RootState } from '../../store';



// import './styles.scss';

export default function CollectionEditorPage() {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');



    const handleSubmit = (event: any) => {
        event.preventDefault();
        dispatch(setSearch(input));
      };

    const modal = useSelector((state: RootState) => state.cardModal.value);
    

    return (
        <div className='deck_editor-container'>
            {
                (modal && <CardModal/>)
            }
            <div className='deck_editor-container-background'>
                <h1 className='deck_editor-title'>Collection</h1>
                <div className='deck_editor-editor'>

                    <section className='deck_editor-deck-container'>
                    <div className='deck_editor-search-container'>
                        <div className='deck_editor-search-bar'>

                        </div>
                        <div className='deck_editor-search-results'>
                            {/* <CollectionRow /> */}
                        </div>
                    </div>
                    <div className='deck_editor-details-container'>
                        <div className='deck_editor-list-container'>
                            <form onSubmit={handleSubmit} className="header-searchbar" action="">
                              <input value={input} onChange={(event) => setInput(event.target.value)} className ="header-searchbar__input" placeholder= "Votre recherche ici..." ></input>
                               <button type="submit"  className="header-searchbar__button">Rechercher</button>
                            </form>
                        </div>
                        <div>
                            <CollectionSearchResults />
                        </div>
                    </div>
                    </section>
                </div>
            </div>
        // </div>
    )
}