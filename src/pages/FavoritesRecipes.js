import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoritesRecipes() {
  const [message, setMessage] = useState(false);
  const [filter, setFilter] = useState([]);
  const [render, setRender] = useState(false);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
  const handleFilterFood = () => {
    const foodFilter = favoriteRecipes.filter((recipe) => recipe.type === 'comida');
    setFilter(foodFilter);
  };
  const handleFilterDrink = () => {
    const drinkFilter = favoriteRecipes.filter((recipe) => recipe.type === 'bebida');
    setFilter(drinkFilter);
  };
  const handleFilter = () => {
    setFilter(favoriteRecipes);
  };
  const handleFavorite = (e) => {
    const removeFavorite = favoriteRecipes.filter((recipe) => recipe.id !== e.target.id);
    setFilter(removeFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
    setRender(true);
  };

  useEffect(() => setFilter(favoriteRecipes), [render]);

  return (
    <section>
      <Header text="Receitas Favoritas" />
      <Button
        testID="filter-by-all-btn"
        handleClick={ handleFilter }
      >
        All
      </Button>
      <Button
        testID="filter-by-food-btn"
        handleClick={ handleFilterFood }
      >
        Comidas
      </Button>
      <Button
        testID="filter-by-drink-btn"
        handleClick={ handleFilterDrink }
      >
        Bebidas
      </Button>
      {filter.map((item, i) => (
        <div key={ item.id }>
          <Link
            key={ item.id }
            to={ `/${item.type}s/${item.id}` }
          >
            <img
              data-testid={ `${i}-horizontal-image` }
              src={ item.image }
              alt={ item.name }
              className="foods"
            />
          </Link>
          <div>
            <Button
              handleClick={ () => {
                navigator.clipboard.writeText(`http://localhost:3000/${item.type}s/${item.id}`);
                setMessage(true);
              } }
            >
              <img
                data-testid={ `${i}-horizontal-share-btn` }
                src={ shareIcon }
                alt="compartilhar"
              />
            </Button>
            <Button
              handleClick={ handleFavorite }
              image={ blackHeartIcon }
              testID={ `${i}-horizontal-favorite-btn` }
            >
              <img
                alt="liked"
                data-testid="favorite-btn"
                src={ blackHeartIcon }
                id={ item.id }
              />
            </Button>
            { message ? <h5>Link copiado!</h5> : null }
            <h4 data-testid={ `${i}-horizontal-top-text` }>
              {item.area
                ? `${item.area} - ${item.category}` : `${item.alcoholicOrNot}`}
            </h4>
            <Link
              key={ item.id }
              to={ `/${item.type}s/${item.id}` }
            >
              <h2 data-testid={ `${i}-horizontal-name` }>{item.name}</h2>
            </Link>
          </div>
        </div>
      )) }
    </section>
  );
}

export default FavoritesRecipes;
