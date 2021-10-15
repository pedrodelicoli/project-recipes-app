import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../Context/Context';
import Button from '../components/Button';
import useFetchRecipes from '../Hooks/useFetchRecipes';
import FavoriteDrink from '../components/FavoriteDrink';

function DrinksRecipies(props) {
  const { recipes, setFavorite, setId } = useContext(Context);
  const urlFood = 'themeal';
  const [details, setDetails] = useState();
  const [message, setMessage] = useState(false);

  const history = useHistory();
  const { match: { params: { id } } } = props;
  useFetchRecipes(urlFood);
  useEffect(() => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    async function fetchResult() {
      const result = await (await fetch(url)).json();
      const obj = result.drinks;
      setDetails(obj[0]);
      setFavorite(obj[0]);
      setId(obj[0].idDrink);
    }
    fetchResult();
  }, []);

  const renderFoods = () => {
    const magic = 6;
    if (recipes.meals.length > magic) {
      const foods = recipes.meals.slice(0, magic);
      return foods.map((food, index) => (
        <Link
          key={ index }
          to={ `/comidas/${food.idMeal}` }
          className="card"
        >
          <div data-testid={ `${index}-recomendation-card` }>
            <h3 data-testid={ `${index}-card-name` }>{ food.strMeal }</h3>
            <img
              src={ food.strMealThumb }
              alt={ food.strMeal }
              data-testid={ `${index}-card-img` }
              className="foods"
            />
          </div>
        </Link>
      ));
    }
  };

  const renderDetails = () => {
    const urlShare = window.location.href;
    if (details !== undefined) {
      return (
        <section>
          <img
            src={ details.strDrinkThumb }
            alt=""
            data-testid="recipe-photo"
            className="recipe-img"
          />
          <h2
            data-testid="recipe-title"
            className="recipe-title"
          >
            { details.strDrink }
          </h2>
          <Button
            testID="share-btn"
            handleClick={ () => {
              navigator.clipboard.writeText(urlShare);
              setMessage(true);
            } }
            className="share-btn"
          >
            Compartilhar
          </Button>
          { message ? <h4>Link copiado!</h4> : null }
          <FavoriteDrink />

          <ul className="recipe-list">
            <h3 className="list-title">Ingredientes</h3>
            {Object.keys(details)
              .filter((detail) => detail.includes('strIngredient'))
              .filter((ing) => details[ing] !== null)
              .map((ingredient, i) => (
                <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                  {details[`strMeasure${i + 1}`]}
                  {details[`strMeasure${i + 1}`] ? ' of ' : null}
                  {details[ingredient]}
                </li>))}
          </ul>
          <h4
            data-testid="recipe-category"
            className="recipe-category"
          >
            { details.strAlcoholic }
          </h4>
          <p
            data-testid="instructions"
            className="recipe-text"
          >
            { details.strInstructions }
          </p>
          <Button
            testID="start-recipe-btn"
            className="initRecipes btn-center"
            handleClick={ () => history.push(`/bebidas/${id}/in-progress`) }
          >
            Iniciar Receita
          </Button>
          <div className="carousel">
            <h3 className="recomendation">Recomendações</h3>
            { recipes.meals !== undefined ? renderFoods() : null }
          </div>
        </section>
      );
    }
  };

  return (
    <div>
      { details !== null ? renderDetails() : null }
    </div>
  );
}

DrinksRecipies.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinksRecipies;
