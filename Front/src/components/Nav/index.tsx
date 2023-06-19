import { useDispatch } from 'react-redux';
import { setSearch, clearSearch } from '../SearchResult/searchSlice';
import { useState } from 'react';
// import { useNavigate, useLocation } from "react-router-dom";

import './styles.scss';

export default function Nav() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const handleSubmit = (event: any) => {
  //   event.preventDefault();
  //   const search = event.target.value;
  //   console.log(search);
  // }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(setSearch(input));
    // navigate('/search-results');
  };

  return(
    <>
    <nav className="header__nav">
    <div className="nav-links">
      <a className="nav-links__link" href="/">Accueil</a>
      <a className="nav-links__link" href="">Collection</a>
      <a className="nav-links__link" href="">Decks</a>
      <a className="nav-links__link" href="/login">Connexion</a>
    </div>
  </nav>
    <form onSubmit={handleSubmit} className="header-searchbar" action="">
      <input value={input} onChange={(event) => setInput(event.target.value)} className ="header-searchbar__input" placeholder= "Votre recherche ici..." ></input>
      <button type="submit"  className="header-searchbar__button">Rechercher</button>
      {/* <input className="header-searchbar__button" type="submit"/> */}
    </form>
    </>
  )
};
