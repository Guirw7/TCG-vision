import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, setCardID } from '../CardModal/modalSlice';
import { setSearch, clearSearch } from './searchSlice';
import axios from 'axios';

import './styles.scss';
import CardModal from '../CardModal';

export default function SearchResult () {
  const modal = useSelector((state: any) => state.cardModal.value);
  const dispatch = useDispatch();
  const [result, setResult] = useState<any>(null);
  const search = useSelector((state: any) => state.search.value);
  const fetchSearch = async () => {
    const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${search}&language=fr`);
    const data = await response.data.data;
    setResult(data);
  };
  useEffect(() => {
    if (search) {
      fetchSearch();
    }
  }, [search])

  const clickHandler = (id: number) => () => { 
    dispatch(setCardID(id));
    dispatch(openModal());
  };

  return (
    <div className='search-result-container'>
      <div className='search-result-container-background'>
        <h1 className='page-title'>Résultats de la recherche :</h1>
          <div>
            <ul>
              {
                result && (
                  result.map((card: any) => {
                    return <li key={card.id}>
                      <button onClick={clickHandler(card.id)} >{card.name}</button>
                    </li>
                  })
                )
              }
            </ul>
            {
              (modal && <CardModal/>)
            }
          </div>
      </div>
    </div>
    
  )
};