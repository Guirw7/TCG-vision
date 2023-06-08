import Nav from '../Nav';
import Icon from '../Icon';
import logo from "../../assets/img/prototypelogo2.png";
import './styles.scss';

export default function Header() {
  return(
    <header className="header">
      <Icon />
      <a className="header-logo" href="/">
        <img src={logo} alt="logo-de-TCG-Vision" />
      </a>
      <Nav />
    </header>
  );
};
