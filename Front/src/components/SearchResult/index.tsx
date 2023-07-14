import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { openModal, setCardID } from '../CardModal/modalSlice';
import { setLoadingOff, setLoadingOn } from '../Loading/loadingSlice';
import Loading from '../Loading';
import CardModal from '../CardModal';
import { axiosRequest } from '../../utils/axiosRequest';
// import './styles.scss';

export default function SearchResult () {
  const [isError, setIsError] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const dispatch = useDispatch();
  const modal = useSelector((state: any) => state.cardModal.value);
  const search = useSelector((state: any) => state.search.value);

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
  
  const stopLoading = () => {
    dispatch(setLoadingOff());
  }

  return (
    <div className='search-result-container'>
      <div className='search-result-container-background'>
        <h1 className='page-title'>Résultats de la recherche :</h1>
        <div className='article-container'>
          { 
            useSelector((state: any) => state.loading.value) && <Loading/>
          }
          { 
            isError && <p className='error-message'>Aucun résultat pour cette recherche</p>
          }
          {
            result && result.map((card: any) => (
              <article className='card-article' onClick={clickHandler(card.id)} key={card.id}>
                <img className='card-article-image' src={`http://daoust-jason-server.eddi.cloud/card_images/${card.id}.jpg`}/>
                <p className='card-article-name'>{card.name}</p>
              </article>
            ))
          }
        </div>
        {
          modal && <CardModal/>
        }
      </div>
    </div>
  )
};
