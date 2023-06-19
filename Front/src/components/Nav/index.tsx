import { useDispatch } from 'react-redux';
import { setSearch, clearSearch } from '../SearchResult/searchSlice';

import './styles.scss';

export default function Nav() {

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const search = event.target[0].value;
    console.log(search);
  }

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
    <form className="header-searchbar" action="">
      <input className ="header-searchbar__input" placeholder= "Votre recherche ici..." ></input>
      <button onClick={handleSubmit} className="header-searchbar__button">Rechercher</button>
    </form>
    </>
  )
};
