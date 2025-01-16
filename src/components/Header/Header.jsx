import { Link } from 'react-router-dom';

import Logo from '../../assets/logo-SportSee.svg';
import './Header.css';

/**
 *
 * @returns
 */
function Header() {
      return (
            <div className="header">
                  <img src={Logo} alt="logo sport" />
                  <nav className="navigation">
                        <Link to="#" className="nav-link">
                              Accueil
                        </Link>
                        <Link to="#" className="nav-link">
                              Profil
                        </Link>
                        <Link to="#" className="nav-link">
                              Réglage
                        </Link>
                        <Link to="#" className="nav-link">
                              Communauté
                        </Link>
                  </nav>
            </div>
      );
}
export default Header;
