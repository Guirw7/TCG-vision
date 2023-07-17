import Nav from '../Nav';
import Icon from '../Icon';
import logo from "../../assets/img/prototypelogo2.png";

import { sessionChecker }  from '../../utils/sessionChecker';

// import './styles.scss';

export default function Header() {
  sessionChecker();

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
