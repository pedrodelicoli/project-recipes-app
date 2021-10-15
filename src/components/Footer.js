import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import cocktail from '../images/cocktail.png';
import explore from '../images/explore.png';
import fork from '../images/fork.png';
import '../styles/footer.css';

import Context from '../Context/Context';

const Footer = () => {
  const { focusFooter, setFocusFooter } = useContext(Context);

  const handleClick = (className) => {
    setFocusFooter(className);
  };

  useEffect(() => {
    if (focusFooter) document.querySelector(`.${focusFooter}`).focus();
  }, [focusFooter]);

  return (
    <footer data-testid="footer">
      <nav className="nav-bar">
        <Link
          to="/bebidas"
          className="nav-item drink"
          onClick={ () => handleClick('drink') }
        >
          <img src={ cocktail } data-testid="drinks-bottom-btn" alt="drinks" />
          <span>Bebidas</span>
        </Link>
        <Link
          to="/explorar"
          className="nav-item explore"
          onClick={ () => handleClick('explore') }
        >
          <img src={ explore } data-testid="explore-bottom-btn" alt="explore" />
          <span>Explorar</span>
        </Link>
        <Link
          to="/comidas"
          className="nav-item food"
          onClick={ () => handleClick('food') }
        >
          <img src={ fork } data-testid="food-bottom-btn" alt="foods" />
          <span>Comidas</span>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
