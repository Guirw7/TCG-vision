import Nav from '../Nav';
import Icon from '../Icon';
import logo from "../../assets/img/prototypelogo2.png";
import './styles.scss';

export default function Header() {
  return(
    <header className="header">
      <Icon />
        <img className="header-logo" src={logo} alt="" />
      <Nav />
    </header>
  );
};
