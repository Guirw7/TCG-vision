import './styles.scss';

export default function Nav() {
  return(
    <>
    <nav className="header__nav">
    <div className="nav-links">
      <a className="nav-links__link" href="">Accueil</a>
      <a className="nav-links__link" href="">Collection</a>
      <a className="nav-links__link" href="">Decks</a>
      <a className="nav-links__link" href="">Connexion</a>
    </div>
  </nav>
    <form className="header-searchbar" action="">
      <input className ="header-searchbar__input" placeholder= "Votre recherche ici..." ></input>
      <button className="header-searchbar__button">Rechercher</button>
    </form>
    </>
  )
};
