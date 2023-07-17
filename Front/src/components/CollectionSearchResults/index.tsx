import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoadingOff, setLoadingOn } from '../Loading/loadingSlice';
import { setUserDeck, clearUserDeck } from '../DeckEditorPage/userDeckSlice';
import Loading from '../Loading';
import { axiosRequest } from '../../utils/axiosRequest';
import { openModal, setCardID } from '../CardModal/modalSlice';

// import './styles.scss';

export default function CollectionSearchResults () {
  const [isError, setIsError] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const dispatch = useDispatch();
  const search = useSelector((state: any) => state.search.value);
  const userDeck = useSelector((state: any) => state.userDeck.value);


  useEffect(() => {
      setResult(null);
      setIsError(false);
      dispatch(setLoadingOn());
      axiosRequest('get', `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${search}&language=fr`)
      .then(data => {
        setResult(data.data);
        setIsError(false);
        dispatch(setLoadingOff());
      })
      .catch(error => {
        console.log('Erreur lors de la requête', error);
        setResult(null);
        setIsError(true);
        dispatch(setLoadingOff());
      });
    }, [search, dispatch]);



    const clickHandler = (id: number) => () => {
      dispatch(setCardID(id));
      dispatch(openModal());
    };

  return (
        <>
          { 
            useSelector((state: any) => state.loading.value) && <Loading />
        }
          { 
            isError && <p className='error-message'>Aucun résultat pour cette recherche</p>
        }
          {
              result && result.map((card: any) => (
            <article className='deck_editor-card-article' onClick={clickHandler(card.id)} key={card.id}>
                <img className='deck_editor-card-article-image' src={`https://daoust-jason-server.eddi.cloud/card_images/${card.id}.jpg`}/>
                <p className='deck_editor-card-article-name'>{card.name}</p>
            </article>
            ))
        }

        </>
  )
};
