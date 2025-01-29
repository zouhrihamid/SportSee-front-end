import { Link } from 'react-router-dom';

import IconYoga from '../../assets/IconYoga.jpg';
import IconNatation from '../../assets/IconNatation.jpg';
import IconVelo from '../../assets/IconVelo.jpg';
import IconMusculation from '../../assets/IconMusculation.jpg';
import './SidePage.css';

function SidePage() {
      return (
            <section className="SidePage">
                  <nav className="navigationside">
                        <Link to="#">
                              <img src={IconYoga} alt="Icon youga" />
                        </Link>
                        <Link to="#">
                              <img src={IconNatation} alt="Icon natation" />
                        </Link>
                        <Link to="#">
                              <img src={IconVelo} alt="Icon velo" />
                        </Link>
                        <Link to="#">
                              <img src={IconMusculation} alt="Icon musculation" />
                        </Link>
                  </nav>
                  <p className="rotated-text">Copiryght, SportSee 2020</p>
            </section>
      );
}
export default SidePage;
