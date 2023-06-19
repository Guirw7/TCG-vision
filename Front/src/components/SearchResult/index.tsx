import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, setCardID } from '../CardModal/modalSlice';
import { setSearch, clearSearch } from './searchSlice';

import './styles.scss';

export default function SearchResult () {
  const search = useSelector((state: any) => state.search.value);
  console.log(search);
  return (
    <div className='search-result-container'>
      <div className='search-result-container-background'>
        <h1 className='page-title'>Résultats de la recherche :</h1>
      </div>
    </div>
    
  )
};
