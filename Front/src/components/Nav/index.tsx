import { useDispatch, useSelector } from 'react-redux';
import { setSearch, clearSearch } from '../SearchResult/searchSlice';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


import './styles.scss';

export default function Nav() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const isConnected = useSelector((state: any) => state.session.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(setSearch(input));
    navigate('/search-result');
  };

  return(
    <>
    <nav className="header__nav">
    <div className="nav-links">
      <a className="nav-links__link" href="/">Accueil</a>
      <a className="nav-links__link" href="/decks">Decks</a>
      <a className="nav-links__link" href="/collection">Collection</a>
      {/* Si l'utilisateur n'est pas connecté */}
      {
        !isConnected && (
          <a className="nav-links__link" href="/login">Connexion</a>
        )
      }
      {/* Si l'utilisateur est connecté */}
      {
        isConnected && (
          <>
          <a className="nav-links__link" href="/login">Profil</a>
          <a className="nav-links__link" href="/login">Déconnexion</a>
          </>
        )
      }
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
