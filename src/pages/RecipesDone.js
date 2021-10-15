import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '../components';
import shareIcon from '../images/shareIcon.svg';

function RecipesDone() {
  const [message, setMessage] = useState(false);
  const [filter, setFilter] = useState([]);
  const recipesDone = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
  const handleFilterFood = () => {
    const foodFilter = recipesDone.filter((recipe) => recipe.type === 'comida');
    setFilter(foodFilter);
  };
  const handleFilterDrink = () => {
    const drinkFilter = recipesDone.filter((recipe) => recipe.type === 'bebida');
    setFilter(drinkFilter);
  };
  const handleFilter = () => {
    setFilter(recipesDone);
  };

  useEffect(() => setFilter(recipesDone), []);

  return (
    <div>
      <Header text="Receitas Feitas" />
      <div>
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
      </div>
      <section>
        {filter.length > 0 ? filter.map((item, i) => (
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
              <p data-testid={ `${i}-horizontal-done-date` }>{item.doneDate}</p>
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
              { message ? <h5>Link copiado!</h5> : null }
              {item.tags.length > 0
                ? item.tags.map((tag, idx) => (
                  <span
                    key={ idx }
                    data-testid={ `${i}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </span>))
                : null}
            </div>
          </div>
        )) : <p>Você ainda não concluiu nenhuma receita</p> }
      </section>
    </div>
  );
}

export default RecipesDone;
