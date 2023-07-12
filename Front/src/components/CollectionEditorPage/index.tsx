import { setSearch, clearSearch } from '../SearchResult/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CollectionSearchResults from '../CollectionSearchResults';
import CardModal from '../CardModal';
import { RootState } from '../../store';
import CollectionRow from '../CollectionRow';
import { axiosRequest } from '../../utils/axiosRequest';
// import { getIDFromToken } from '../../utils/getIDFromToken';



// import './styles.scss';

export default function CollectionEditorPage() {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const singleCollection = useSelector((state: any) => state.singleCollection.value);

  const [userCollection, setUserCollection] = useState<any>(null)
  const modal = useSelector((state: RootState) => state.cardModal.value);


  useEffect(() => {
    // const id = getIDFromToken();

    if (singleCollection) {
        const route = `collection/${singleCollection}`;
        const url = `https://daoust-jason-server.eddi.cloud/private/${route}`;
        
        axiosRequest('get', url, {
            'headers': {
              'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
            },
          })
        .then(response => {
            // console.log(response);
            setUserCollection(response);
        })
        .catch(error => {
            console.log('Erreur lors de la requête', error);
        });
    }
}, [modal]);



  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(setSearch(input));
  };

  

  return (
    <div className="deck_editor-container">
      {modal && <CardModal />}
      <div className="deck_editor-container-background">
        <h1 className="deck_editor-title">Collection</h1>
        <div className="deck_editor-editor">
          <section className="deck_editor-deck-container">
            <div className="deck_editor-search-container">
              <div className="deck_editor-search-bar"></div>
              <div className="collection-list">

                {userCollection && (
                  userCollection.set_code.map((code: any, index: number) => (
                    <CollectionRow key={index} set_code={code}/>
                  )))}

              </div>

            </div>
            <div className="deck_editor-details-container">
              <div className="deck_editor-list-container">
                <form
                  onSubmit={handleSubmit}
                  className="header-searchbar"
                  action=""
                >
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="header-searchbar__input"
                    placeholder="Votre recherche ici..."
                  ></input>
                  <button type="submit" className="header-searchbar__button">
                    Rechercher
                  </button>
                </form>
                <CollectionSearchResults />
              </div>
              <div>
              </div>
            </div>
          </section>
        </div>
      </div>
      //{' '}
    </div>
  );
}
