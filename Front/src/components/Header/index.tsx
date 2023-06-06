import Nav from '../Nav';
import Icon from '../Icon';
import './styles.scss';

export default function Header() {
  return(
    <header className="header">
      <Icon />
      <div className="header-logo">
        <h1 className="header-logo__title">TCG-Vision</h1>
        <h2 className="header-logo__subtitle">A toi de jouer!</h2>
      </div>
      <Nav />
    </header>
  );
};
